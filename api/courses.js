import express from 'express';
import * as coursesModel from '../model/coursesModel.js';
const coursesRouter = express.Router();

//CRUD (Create, Read, Update, Delete) műveleteket REST végpontokon keresztül.
//id, title, description
coursesRouter.post('/', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).send({
                error: 'Cím és Leírás megadása kötelező.'
            });
        }

        const result = await coursesModel.insertCourse(req.body);
        res.status(201).send({
            message: 'Kurzus sikeresen hozzáadva.',
            id: result.insertId
        });
    } catch (error) {
        console.error('Hiba a kurzus hozzáadásakor:', error);
        res.status(501).send({
            error: 'Hiba történt a kurzus hozzáadása során.'
        });
    }
});

//get

coursesRouter.get('/', async (req, res) => {
    try {
        const courses = await coursesModel.getAllCourses();
        res.status(201).send(courses);
    } catch (error) {
        console.error('Hiba a kurzusok lekérésekor:', error);
        res.status(501).send({ error: 'Hiba történt a kurzusok lekérése során.' });
    }
});

//put

coursesRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).send({
                error: 'Cím és Leírás megadása kötelező.'
            });
        }

        const result = await coursesModel.updateCourse(id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Kurzus nem található.' });
        }

        res.status(200).send({ message: 'Kurzus sikeresen frissítve.' });
    } catch (error) {
        console.error('Hiba a kurzus frissítésekor:', error);
        res.status(501).send({
            error: 'Hiba történt a kurzus frissítése során.'
        });
    }
});

//delete

coursesRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await coursesModel.deleteCourse(id);

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Kurzus nem található.' });
        }

        res.status(200).send({ message: 'Kurzus sikeresen törölve.' });
    } catch (error) {
        console.error('Hiba a kurzus törlésekor:', error);
        res.status(501).send({
            error: 'Hiba történt a kurzus törlése során.'
        });
    }
});

export default coursesRouter;