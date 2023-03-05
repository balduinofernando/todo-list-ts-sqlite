import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ETodoStatus, Todo } from '../models';
import * as yup from 'yup';
import { database } from '../database/knex';
import { ETableNames } from '../database/ETableNames';

interface ITodo {
    user_id: number,
    task_name: string,
    status: string
}


const schemaValidation = yup.object().shape({
    user_id: yup.number().required(),
    task_name: yup.string().required().min(10),
    status: yup.string().required()
});

export class TodoController {

    async index(request: Request, response: Response) {
        const todos = await new Todo().get();
        if (!todos) return response.status(StatusCodes.NOT_FOUND).json({ message: 'No To-dos was found' });

        return response.status(StatusCodes.OK).json({ todos });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const todo = await new Todo().getById(Number(id));
        if (!todo) return response.status(StatusCodes.NOT_FOUND).json({ message: 'No To-do was found' });

        return response.status(StatusCodes.OK).json({ todo });
    }

    async store(request: Request, response: Response) {
        const { user_id, task_name, status } = request.body;
        let validatedFields: ITodo | undefined = undefined;

        try {
            validatedFields = await schemaValidation.validate({ user_id, task_name, status });
        } catch (error) {
            const yupError = error as yup.ValidationError;

            return response.status(StatusCodes.BAD_REQUEST).json({
                error: {
                    default: yupError.message
                }
            });
        }

        await database(ETableNames.todos).insert({
            user_id: validatedFields.user_id,
            task_name: validatedFields.task_name,
            status: validatedFields.status,
            created_at: new Date(),
            updated_at: new Date()
        });

        return response.status(StatusCodes.CREATED).json({ message: 'Task added sucessfully' });

    }

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const toDoExists = await new Todo().getById(Number(id));
        if (!toDoExists) return response.status(StatusCodes.NOT_FOUND).json({ message: 'Task Not FOound' });


        const { user_id, task_name, status } = request.body;
        let validatedFields: ITodo | undefined = undefined;

        try {
            validatedFields = await schemaValidation.validate({ user_id, task_name, status });
        } catch (error) {
            const yupError = error as yup.ValidationError;

            return response.status(StatusCodes.BAD_REQUEST).json({
                error: {
                    default: yupError.message
                }
            });
        }

        await new Todo().update(Number(id), {
            user_id: validatedFields.user_id,
            task_name: validatedFields.task_name,
            status: validatedFields.status ?? ETodoStatus.inProgress,
        });

        return response.status(StatusCodes.ACCEPTED).json({
            message: 'Task updated Successfully'
        });

    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const toDoExists = await new Todo().getById(Number(id));
        if (!toDoExists) return response.status(StatusCodes.NOT_FOUND).json({ message: 'Task Not Found' });

        await new Todo().delete(Number(id));

        return response.status(StatusCodes.ACCEPTED).json({ message: 'Task Removed From The Database' });
    }


}