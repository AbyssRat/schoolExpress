import express from 'express';
import * as enrollmentsModel from '../model/enrollmentsModel.js';
const enrollmentsRouter = express.Router();

//CRUD (Create, Read, Update, Delete) műveleteket REST végpontokon keresztül.

//id	student_id	course_id	enrolled_at	

enrollmentsRouter.post('/', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const { student_id, course_id, enrolled_at } = req.body;

        if (!student_id || !course_id || !enrolled_at) {
            return res.status(400).send({
                error: 'Student ID, Course ID és Enrolled At megadása kötelező.'
            });
        }

        const result = await enrollmentsModel.insertEnrollment(req.body);
        res.status(201).send({
            message: 'Beiratkozás sikeresen hozzáadva.',
            id: result.insertId
        });
    } catch (error) {
        console.error('Hiba a beiratkozás hozzáadásakor:', error);
        res.status(501).send({
            error: 'Hiba történt a beiratkozás hozzáadása során.'
        });
    }
});

//get

enrollmentsRouter.get('/', async (req, res) => {
    try {
        const enrollments = await enrollmentsModel.getAllEnrollments();
        res.status(201).send(enrollments);
    } catch (error) {
        console.error('Hiba a beiratkozások lekérésekor:', error);
        res.status(501).send({ error: 'Hiba történt a beiratkozások lekérése során.' });
    }
});

//put

enrollmentsRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const { student_id, course_id, enrolled_at } = req.body;

        if (!student_id || !course_id || !enrolled_at) {
            return res.status(400).send({
                error: 'Student ID, Course ID és Enrolled At megadása kötelező.'
            });
        }

        const result = await enrollmentsModel.updateEnrollment(id, req.body);
        res.status(201).send({
            message: 'Beiratkozás sikeresen frissítve.',
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error('Hiba a beiratkozás frissítésekor:', error);
        res.status(501).send({
            error: 'Hiba történt a beiratkozás frissítése során.'
        });
    }
});

//delete

enrollmentsRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await enrollmentsModel.deleteEnrollment(id);
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Beiratkozás nem található.' });
        }
        res.status(201).send({ message: 'Beiratkozás sikeresen törölve.' });
    } catch (error) {
        console.error('Hiba a beiratkozás törlésekor:', error);
        res.status(501).send({
            error: 'Hiba történt a beiratkozás törlése során.'
        });
    }
});

export default enrollmentsRouter;
