
import { Request, Response } from 'express';
import Person from '../models/Person';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

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
        const people = await new Person().getAll();

        return response.json({ 'people': people });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        if (!id) return response.json({ message: 'No id were specified' });

        const person = await new Person().getPerson(Number(id));
        return response.json({ person });
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    async save(request: Request<{}, {}, IPerson>, response: Response) {

        let validatedData: IPerson | undefined = undefined;

        try {
            validatedData = await yupSchema.validate(request.body, { abortEarly: false });
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


        new Person().insertPerson(validatedData);

        return response.status(StatusCodes.CREATED).json({
            'message': 'Person Saved Successfully',
        });
    }

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


        const personExists = new Person().getPerson(Number(id));
        if (!personExists) return response.status(404).json({ 'message': 'Não foi possivel atualizar os dados' });

        new Person().updatePerson(Number(id), validatedData);

        return response.status(201).json({ 'message': 'Person Updated Successfully' });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        if (!id) return response.json({ 'message': 'Nenhum ID foi Informado' });

        const personExists = new Person().getPerson(Number(id));
        if (!personExists) return response.status(404).json({ 'message': 'Não foi possível eliminar essa pessoa' });

        new Person().deletePerson(Number(id));

        return response.json({ 'message': 'Person Deleted Successfully' });
    }

}