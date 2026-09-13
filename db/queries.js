import { pool } from './pool.js';

export async function getAllPraises() {
    const { rows } = await pool.query('SELECT * FROM praises');
    return rows;
}

export async function addPraise(username, text, date) {
    await pool.query('INSERT INTO praises (username, text, date) VALUES ($1, $2, $3)', [username, text, date]);

}

export async function findPraiseByUser(searchedName) {
    const { rows } = await pool.query('SELECT * FROM praises WHERE username ILIKE \'%\' || $1 || \'%\' ORDER BY CASE WHEN username ILIKE $1 THEN 1 WHEN username ILIKE $1 || \'%\' THEN 2 ELSE 3 END, LENGTH(username) ASC, username ASC;', [searchedName]);
    return rows;
}

export async function deletePraiseById(id) {
    await pool.query('DELETE FROM praises WHERE praises.id = $1', [id]);
}


export async function findSpecificPraise(id) {
    const { rows: [praise] } = await pool.query('SELECT * FROM praises WHERE praises.id = $1', [id]);
    return praise;
}

export async function updatePraiseByUser(username, text, date, id) {
    await pool.query('UPDATE praises SET username = $1, text = $2, date = $3 WHERE id = $4', [username, text, date, id]);
}