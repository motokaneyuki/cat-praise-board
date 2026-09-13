import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS praises (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 10 ),
    text VARCHAR ( 100 ),
    date DATE
);

INSERT INTO praises (username, text, date)
VALUES 
    ('Yuki', 'You are the cutest fluffball!', '2026-08-30'),
    ('Yuki', 'Best cat evurrr!', '2026-08-29');
`

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    try {
        await client.connect();
        await client.query(SQL);
        console.log('added to database');
    } catch(error) {
        console.error('error adding to database', error);
    } finally {
        await client.end();
        console.log('done');
    }
}
main();