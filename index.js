import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());
app.use(express.json());

//ide

import studentsRouter from './api/students.js';

//:3

app.use('/students', studentsRouter);

//itt meg vége

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});