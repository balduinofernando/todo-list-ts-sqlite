import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Person Controller', () => {

    it('O endpoint de listar pessoas existentes no banco de dados', async () => {
        const response = (await testServer.get('/people'));
        expect(response.statusCode).toEqual(StatusCodes.OK);
    });

    it(' vao ser listadas todas as pessoas num formato JSON ', async () => {
        const response = await (await testServer.get('/people'));
        expect(response.body).toEqual({ people: [] });
    });

    it('uma pessoa vai ser adicionada no banco de dados', async () => {
        const data = {
            name: 'Nazarina',
            age: 18
        };

        const response = await testServer.post('/people')
            .send(data).expect(StatusCodes.CREATED);
        expect(response.body).toStrictEqual({ message: 'Person Saved Successfully' });
    });
});