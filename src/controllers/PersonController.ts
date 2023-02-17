
import { Request, Response } from 'express';
import Person from '../models/Person';
import { StatusCodes } from 'http-status-codes';

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

    async save(request: Request, response: Response) {

        const { name, age } = request.body;

        if (!name) return response.status(StatusCodes.NO_CONTENT).json({ 'message': 'The name is required' });
        if (!age) return response.status(StatusCodes.NO_CONTENT).json({ 'message': 'The age is required' });


        new Person().insertPerson({ name, age });

        return response.status(StatusCodes.CREATED).json({
            'message': 'Person Saved Successfully',
        });
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, age } = request.body;

        if (!id || !name || !age) {
            return response.json({ 'message': 'Verifique os dados informados' });
        }
        const personExists = new Person().getPerson(Number(id));
        if (!personExists) return response.status(404).json({ 'message': 'Não foi possivel atualizar os dados' });

        new Person().updatePerson(Number(id), { name, age });

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