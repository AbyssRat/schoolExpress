import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());
app.use(express.json());

//ide

import studentsRouter from './api/students.js';
import coursesRouter from './api/courses.js';

//:3

app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);

//itt meg vége

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});