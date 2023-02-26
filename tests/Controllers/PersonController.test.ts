import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Person Controller', () => {

    it('will list all people in the database', async () => {
        const response = await testServer.get('/pessoa');

        expect(response.status).toEqual(StatusCodes.OK);
    });

    it('uma pessoa vai ser adicionada', async () => {
        const response = await testServer.post('/pessoa')
            .send({
                'name': 'Nazarina',
                'age': '18'
            });
        expect(response.statusCode).toEqual(StatusCodes.CREATED);
    });
});