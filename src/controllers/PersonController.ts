
import { Request, RequestHandler, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { ETableNames } from '../database/ETableNames';
import { database } from '../database/knex';
import { Person } from '../models';

interface IPerson {
    name: string,
    age: number
}

const yupSchema: yup.Schema<IPerson> = yup.object().shape({
    name: yup.string().required().min(2),
    age: yup.number().required()
});

export default class PersonController {

    async index(request: Request, response: Response) {
        const result = await new Person().getAll();

        return response.json({ people: result });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        if (!id) return response.json({ message: 'No id was specified' });

        const person = await new Person().getById(Number(id));

        if (!person.length) {
            return response.status(StatusCodes.NOT_FOUND).json({
                message: 'Registro Não Encontrado'
            });
        }

        return response.json({ person });
    }

    bodyValidator: RequestHandler = async (request, response, next) => {
        try {
            await yupSchema.validate(request.body, { abortEarly: false });
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


    // eslint-disable-next-line @typescript-eslint/ban-types
    save: RequestHandler = async (request: Request<{}, {}, IPerson>, response: Response) => {

        // let validatedData: IPerson | undefined = undefined;
        const { name, age } = request.body;

        await database(ETableNames.people).insert({ name, age });

        return response.status(StatusCodes.CREATED).json({
            'message': 'Person Saved Successfully',
        });
    };

    async update(request: Request, response: Response) {
        const { id } = request.params;

        let validatedData: IPerson | undefined = undefined;

        try {
            validatedData = await yupSchema.validate(request.body);
        } catch (error) {
            const yupError = error as yup.ValidationError;

            return response.status(StatusCodes.BAD_REQUEST)
                .json({
                    errors: {
                        default: yupError.message,
                    }
                });
        }


        const personExists = await database(ETableNames.people).where({ id }).first();
        if (personExists.length < 0) return response.status(404).json({ 'message': 'Não foi possivel atualizar os dados' });

        await database(ETableNames.people).where({ id }).update({ name: validatedData.name, age: validatedData.age });

        return response.status(201).json({ 'message': 'Person Updated Successfully' });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        if (!id) return response.json({ 'message': 'Nenhum ID foi Informado' });

        const personExists = await database(ETableNames.people).where({ id }).first();
        if (personExists.length < 0) return response.status(404).json({ 'message': 'Não foi possivel atualizar os dados' });

        await database(ETableNames.people).where({ id }).delete();

        return response.json({ 'message': 'Person Deleted Successfully' });
    }

}