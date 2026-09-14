import express from 'express';
import path from 'node:path';
import { indexRouter } from './routes/indexRouter.js';

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Listening on port ${PORT}`);
})

app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.use((error, req, res, next) => {
    console.error(error);

    // invalid value format, such as a non-numeric ID
    if (error.code === '22P02') {
        return res.status(400).send('Invalid praise ID.');
    }

    res.status(500).send('Something went wrong.');
});