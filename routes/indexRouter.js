import { Router } from "express";
import { randomUUID } from "node:crypto";

export const indexRouter = Router();

const praises = [
  {
    text: "You are the cutest fluffball!",
    user: "Yuki",
    date: new Date(),
    id: crypto.randomUUID(),
  },
  {
    text: "Best cat evurrr!",
    user: "Yuki",
    date: new Date(),
    id: crypto.randomUUID(),
  }
];

indexRouter.get('/', (req, res) => {
    res.render('index', { message: 'hello moo, the greatest cat!', praises: praises });
})

indexRouter.get('/new', (req, res) => {
    res.render('form');
})

indexRouter.post('/new', (req, res) => {
    praises.push({ text: req.body.praise, user: req.body.name, date: new Date(), id: crypto.randomUUID() });
    res.redirect('/');
})

indexRouter.get('/message/:id', (req,res) => {
    const { id } = req.params;
    const message = praises.find((praise) => praise.id == id);

    if (!message) {
        res.status(404).send('Praise not found');
        return;
    }

    res.render('message', {message: message});
})