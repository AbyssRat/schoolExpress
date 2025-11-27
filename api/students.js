import express from 'express';
import * as studentsModel from '../model/studentsModel.js';
const studentsRouter = exppress.Router();

//CRUD (Create, Read, Update, Delete) műveleteket REST végpontokon keresztül.

//post id	name	email	birthdate	

studentsRouter.post('/', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const { name, email, birthdate } = req.body;

        if (!name || !email || !birthdate) {
            return res.status(400).send({
                error: 'Név, Email és Születési dátum megadása kötelező.'
            });
        }

        const result = await studentsModel.insertStudent(req.body);
        res.status(201).send({
            message: 'Diák sikeresen hozzáadva.',
            id: result.insertId
        });
    } catch (error) {
        console.error('Hiba a diák hozzáadásakor:', error);
        res.status(501).send({
            error: 'Hiba történt a diák hozzáadása során.'
        });
    }
});


//get

studentsRouter.get('/', async (req, res) => {
    try {
        const students = await studentsModel.getAllStudents();
        res.status(201).send(students);
    } catch (error) {
        console.error('Hiba a diákok lekérésekor:', error);
        res.status(501).send({ error: 'Hiba történt a diákok lekérése során.' });
    }
});

//put

studentsRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const { name, email, birthdate } = req.body;

        if (!name || !email || !birthdate) {
            return res.status(400).send({
                error: 'Név, Email és Születési dátum megadása kötelező.'
            });
        }

        const result = await studentsModel.updateStudent(id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Diák nem található.' });
        }

        res.status(201).send({ message: 'Diák sikeresen frissítve.' });
    } catch (error) {
        console.error('Hiba a diák frissítésekor:', error);
        res.status(501).send({ error: 'Hiba történt a diák frissítése során.' });
    }
});


//delete

studentsRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await studentsModel.deleteStudent(id);
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Diák nem található.' });
        }

        res.status(201).send({ message: 'Diák sikeresen törölve.' });
    } catch (error) {
        console.error('Hiba a diák törlésekor:', error);
        res.status(501).send({ error: 'Hiba történt a diák törlése során.' });
    }
});
