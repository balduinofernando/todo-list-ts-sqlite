import { compare, hash } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { ETableNames } from '../../src/database/ETableNames';
import { database } from '../../src/database/knex';
import { ITodo } from '../../src/models';
import { testServer } from '../jest.setup';
import jwt from 'jsonwebtoken';


describe('Todo Controller', () => {

    test('a todo can be added into the database', async () => {
        const response = await (testServer.post('/todos').set({ 'Content-Type': 'application/json' })
            .send({
                'user_id': 1,
                'task_name': 'Todo Example',
                'status': 'In Progress'
            }));
        expect(response.status).toBe(StatusCodes.CREATED);
    });

    test('verify the last added task in the database', async () => {
        // Arrange
        const userFields = { name: 'Balduino', email: 'o_balduino@sapo.ao', password: (await hash('fernando', 10)).toString() };
        const { id } = await database(ETableNames.users).insert(userFields).returning('id').then(rows => rows[0]);

        const taskFields: Omit<ITodo, 'id'> = {
            user_id: Number(id),
            task_name: 'Task 1',
            status: 'In Progress'
        };

        const todo = await database(ETableNames.todos).insert(taskFields).returning('*').then(rows => rows[0]);

        // console.log(todo);

        // Asserts
        const getResponse = await testServer.get('/todos/' + todo.id).expect(StatusCodes.OK);
        //console.log(getResponse.body);


        expect(getResponse.body).toEqual({
            todo: {
                id: 2,
                user_id: 2,
                task_name: 'Task 1',
                status: 'In Progress',
                created_at: null,
                updated_at: null
            }
        });

    });

    test('a user must be logged in to view a task', async () => {
        // Arrange
        const loginData = { email: 'balduino@sapo.ao', password: 'fernando' };
        let token: string | null = null;
        const appSecret: any = process.env.APP_TOKEN?.toString();
        const user = await database(ETableNames.users).where({ email: loginData.email, }).first();

        const userIsValid = await compare(loginData.password, user.password);

        // Generate token
        if (userIsValid) {
            token = jwt.sign({ user }, appSecret, {
                expiresIn: '30s'
            });
        }

        // Act
        const response = await testServer.get('/todos').set({ 'Authorization': `Bearer ${token}` });

        expect(response.status).toBe(StatusCodes.OK);
    });

    test('if a token is bad informed, when listing the tasks, it will return a 401 Status Code', async () => {
        // Act
        const response = await testServer.get('/todos');

        expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });
});