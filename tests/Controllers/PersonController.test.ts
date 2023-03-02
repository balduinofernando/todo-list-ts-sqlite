import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Person Controller', () => {

    it('O endpoint de listar pessoas existentes no banco de dados', async () => {
        const response = await (await testServer.get('/'));
        expect(response.statusCode).toEqual(StatusCodes.OK);
    });

    it(' vao ser listadas todas as pessoas num formato JSON ', async () => {
        const response = await (await testServer.get('/'));
        expect(response.type).toEqual('application/json');
    });

    it('uma pessoa vai ser adicionada no banco de dados', async () => {
        const response = await testServer.post('/pessoa')
            .send({
                'name': 'Nazarina',
                'age': '18'
            });
        expect(response.statusCode).toEqual(StatusCodes.CREATED);
    });
});