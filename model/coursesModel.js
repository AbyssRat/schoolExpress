import pool from '../db.js';

//CRUD (Create, Read, Update, Delete) műveleteket REST végpontokon keresztül.

export const getAllCourses = async () => {
    const [rows] = await pool.query('SELECT * FROM courses');
    return rows;
}

export const insertCourse = async (course) => {
    const { title, description } = course;
    const [result] = await pool.query(
        'INSERT INTO courses (title, description) VALUES (?, ?)',
        [title, description]
    );
    return result;
}

export const updateCourse = async (id, course) => {
    const { title, description } = course;
    const [result] = await pool.query(
        'UPDATE courses SET title = ?, description = ? WHERE id = ?',
        [title, description, id]
    );
    return result;
};

export const deleteCourse = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM courses WHERE id = ?',
        [id]
    );
    return result;
};