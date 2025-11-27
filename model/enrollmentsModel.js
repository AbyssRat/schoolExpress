import pool from '../db.js';

//CRUD (Create, Read, Update, Delete) műveleteket REST végpontokon keresztül.

export const getAllEnrollments = async () => {
    const [rows] = await pool.query('SELECT * FROM enrollments');
    return rows;
}

export const insertEnrollment = async (enrollment) => {
    const { student_id, course_id, enrolled_at } = enrollment;
    const [result] = await pool.query(
        'INSERT INTO enrollments (student_id, course_id, enrolled_at) VALUES (?, ?, ?)',
        [student_id, course_id, enrolled_at]
    );
    return result;
}

export const updateEnrollment = async (id, enrollment) => {
    const { student_id, course_id, enrolled_at } = enrollment;
    const [result] = await pool.query(
        'UPDATE enrollments SET student_id = ?, course_id = ?, enrolled_at = ? WHERE id = ?',
        [student_id, course_id, enrolled_at, id]
    );
    return result;
};

export const deleteEnrollment = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM enrollments WHERE id = ?',
        [id]
    );
    return result;
};
