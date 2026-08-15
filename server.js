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

app.use('/', indexRouter);
