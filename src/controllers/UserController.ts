import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';


interface IUser {
    id: number,
    name: string, email: string
}
export default class UserController {


    async index(request: Request, response: Response) {

        const users = await new User().getAll();

        return response.json({ 'users': users });
    }

    async save(request: Request, response: Response) {

        const saltRounds = 10;

        const { name, email, password } = request.body;

        if (!name) return response.json({ message: 'Informe o nome do usuário' });
        if (!email) return response.json({ message: 'Informe o email do usuário' });
        if (!password) return response.json({ message: 'Informe a palavra passe' });

        const hashPassword = await bcrypt.hashSync(password, saltRounds);

        await new User().save({ name, email, password: hashPassword });

        return response.json({ message: 'Usuário adicionado' });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const user = await new User().getUser(Number(id));

        if (!user) {
            return response.status(StatusCodes.NOT_FOUND).json({ 'message': 'User Not Found' });
        }

        const { id: user_id, name, email, created_at } = user;


        return response.status(StatusCodes.OK).json({ user_id, name, email, created_at });

    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, email, password } = request.body;

        if (!Number(id)) return response.json({ message: 'ID não Informado' });

        const userExists = await new User().getUser(Number(id));

        if (!userExists) return response.json({ message: 'Usuário não encontrado', statusCode: response.statusCode });

        await new User().update(Number(id), { name, email, password });

        return response.json({ message: 'Dados de usuário atualizados' });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        if (!id) return response.json({ message: 'Informe um usuário' });

        const userExists = await new User().getUser(Number(id));

        if (!userExists) return response.json({ message: 'Usuário não encontrado' });

        await new User().delete(Number(id));

        return response.json({
            message: 'User Deleted'
        });
    }
}