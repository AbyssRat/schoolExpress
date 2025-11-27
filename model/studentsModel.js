import pool from '../db.js';

//CRUD (Create, Read, Update, Delete) műveleteket REST végpontokon keresztül.

export const getAllStudents = async () => {
    const [rows] = await pool.query('SELECT * FROM students');
    return rows;
}

export const insertStudent = async (student) => {
    const { name, email, birthdate } = student;
    const [result] = await pool.query(
        'INSERT INTO students (name, email, birthdate) VALUES (?, ?, ?)',
        [name, email, birthdate]
    );
    return result;
}

export const updateStudent = async (id, student) => {
    const { name, email, birthdate } = student;
    const [result] = await pool.query(
        'UPDATE students SET name = ?, email = ?, birthdate = ? WHERE id = ?',
        [name, email, birthdate, id]
    );
    return result;
};

export const deleteStudent = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM students WHERE id = ?',
        [id]
    );
    return result;
};