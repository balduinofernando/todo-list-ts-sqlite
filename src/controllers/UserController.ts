import { NextFunction, Request, RequestHandler, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface IUser {
    id: number,
    name: string,
    email: string,
    password: string,
    created_at?: string,
    updated_at?: string
}

const userValidationSchema = yup.object().shape({
    name: yup.string().required().min(2),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(255).required()
});

export default class UserController {

    bodyValidator: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            await userValidationSchema.validate(request.body, { abortEarly: false });
            return next();
        } catch (error) {

            const yupError = error as yup.ValidationError;
            const errors: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if (error.path) {
                    errors[error.path] = error.message;
                }

            });

            return response.status(StatusCodes.BAD_REQUEST).json({ errors });
        }
    };

    async index(request: Request, response: Response) {
        const users = await new User().all();
        return response.json({ 'users': users });
    }

    async save(request: Request, response: Response) {

        const saltRounds = 10;
        const { name, email, password }: IUser = request.body;

        const emailExists = await new User().getByEmail(email);

        if (emailExists) {
            return response.status(StatusCodes.CONFLICT).json({
                message: 'A user with this e-mail already exists'
            });
        }

        try {
            await userValidationSchema.validate({ name, email, password });
        } catch (error) {
            const yupError = error as yup.ValidationError;

            return response.status(StatusCodes.BAD_REQUEST)
                .json({
                    errors: {
                        default: yupError.message,
                    }
                });
        }

        const hashPassword = await bcrypt.hashSync(password, saltRounds);

        await new User().save({ name, email, password: hashPassword });

        return response.json({ message: 'Usuário adicionado' });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const user: IUser = await new User().getById(Number(id));

        if (!user) {
            return response.status(StatusCodes.NOT_FOUND).json({ 'message': 'Record Not Found' });
        }

        return response.status(StatusCodes.OK).json({ name: user.name, email: user.email, created_at: user.created_at, updated_at: user.updated_at });

    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, email, password } = request.body;
        if (!Number(id)) return response.json({ message: 'ID não Informado' });

        // Ckeck if user with informed email exists
        try {
            const validatedFields = userValidationSchema.validate({ name, email, password });
        } catch (error) {
            const yupError = error as yup.ValidationError;

            return response.status(StatusCodes.BAD_REQUEST)
                .json({
                    errors: {
                        default: yupError.message,
                    }
                });
        }

        const userExists = await new User().getById(Number(id));

        if (!userExists) return response.status(StatusCodes.NOT_FOUND).json({ message: 'Usuário não encontrado', });

        await new User().update(Number(id), { name, email, password });

        return response.status(StatusCodes.OK).json({ message: 'Dados de usuário atualizados' });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        if (!id) return response.json({ message: 'Informe um usuário' });

        const userExists = await new User().getById(Number(id));

        if (!userExists) return response.status(StatusCodes.NOT_FOUND).json({ message: 'Usuário não encontrado' });

        await new User().delete(Number(id));

        return response.status(StatusCodes.ACCEPTED).json({
            message: 'User Deleted'
        });
    }
}