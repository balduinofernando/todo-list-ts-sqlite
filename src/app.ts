import { openDatabase } from './config/database';
import express, { Request, response, Response } from 'express';
import { Person } from './controllers/Person';

const app = express();

app.use(express.json());

openDatabase();
new Person().createTablePerson();

app.get('/', async (request: Request, response: Response) => {

    let pessoas = await new Person().listPeople();

    return response.json({ people: pessoas });
});

app.get('/pessoa/:id', async (request: Request, response: Response) => {

    const { id } = request.params;

    let pessoa = await new Person().getPerson(Number(id));

    return response.json({ person: pessoa });
});

app.post("/pessoa", (request: Request, response: Response): Response => {

    const result = new Person().insertPerson({
        name: request.body.name,
        age: request.body.age,
    });

    return response.json({
        "message": 'Person Created Successfully',
        "result": result
    });
})

app.put("/pessoa/:id", (request, response): Response => {
    const { id } = request.params;

    const result = new Person().updatePerson(Number(id), {
        name: request.body.name,
        age: Number(request.body.age)
    })

    return response.json({ "message": 'Person Updated Successfully' });

})

app.delete("/pessoa/:id", (request, response): Response => {
    const { id } = request.params;

    new Person().deletePerson(Number(id));

    return response.json({ "message": 'Person Deleted Successfully' });

})


app.listen(3000, () => console.log(`API Executando em http://localhost:3000`));