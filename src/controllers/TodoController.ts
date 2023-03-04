import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ETableNames } from '../database/ETableNames';
import { database } from '../database/knex';
import { Todo } from '../models';
import * as yup from 'yup';

interface ITodo {
    user_id: number,
    task_name: string,
    status: string
}


const schemaValidation = yup.object().shape({
    user_id: yup.number().integer().required(),
    task_name: yup.string().required().min(10),
    status: yup.string().required()
});

export class TodoController {

    async index(request: Request, response: Response) {
        const todos = await new Todo().get();
        if (!todos) return response.status(StatusCodes.NOT_FOUND).json({ message: 'No To-dos was found' });

        return response.status(StatusCodes.OK).json({ todos });
    }

    async show(request: Request, response: Response) { }

    async store(request: Request, response: Response) {
        // const { user_id, task_name, status } = request.body;
        let validatedFields: ITodo | undefined = undefined;

        try {
            validatedFields = await schemaValidation.validate(request.body);
        } catch (error) {
            const yupError = error as yup.ValidationError;

            return response.status(StatusCodes.BAD_REQUEST).json({
                error: {
                    default: yupError.message
                }
            });
        }
        await database(ETableNames.todos).insert({ user_id: validatedFields.user_id, task_name: validatedFields.task_name, status: validatedFields.status });

        return response.status(StatusCodes.CREATED).json({ message: 'Task added' });

    }

    async update(request: Request, response: Response) { }

    async delete(request: Request, response: Response) { }


}