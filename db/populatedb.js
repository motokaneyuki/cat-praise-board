import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS praises (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 10 ),
    text VARCHAR ( 100 ),
    date DATE
);

TRUNCATE TABLE praises RESTART IDENTITY;

INSERT INTO praises (username, text, date)
VALUES 
    ('Yuki', 'You are the cutest fluffball!', '2026-08-30'),
    ('Yuki', 'Best cat evurrr!', '2026-08-29');

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 255 ),
    password VARCHAR ( 255 )
);
`

async function main() {
    console.log('seeding...');
    const connectionString = process.argv[2];

    if (!connectionString) {
        throw new Error('Database URL is required');
    }

    const client = new Client({
        connectionString,
    });
    try {
        await client.connect();
        await client.query(SQL);
        console.log('added to database');
    } catch(error) {
        console.error('error adding to database', error);
        process.exitCode = 1;
    } finally {
        await client.end();
        console.log('done');
    }
}
main();