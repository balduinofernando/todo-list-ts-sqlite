import { ITodo, IPerson, IUser } from '../../../models';

declare module 'knex/types/tables'
{
    interface Tables {
        person: IPerson;
        user: IUser;
        todo: ITodo
    }
}