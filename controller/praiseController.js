import { randomUUID } from "node:crypto";

const praises = [
  {
    text: "You are the cutest fluffball!",
    user: "Yuki",
    date: new Date(),
    id: randomUUID(),
  },
  {
    text: "Best cat evurrr!",
    user: "Yuki",
    date: new Date(),
    id: randomUUID(),
  }
];

export const getPraises = (req, res) => {
    res.render('index', { message: 'hello moo, the greatest cat!', praises: praises });
}

export const getForm = (req, res) => {
    res.render('form');
}

export const createPraise = (req, res) => {
    praises.push({ text: req.body.praise, user: req.body.name, date: new Date(), id: crypto.randomUUID() });
    res.redirect('/');
}

export const getPraiseById = (req, res) => {
    const { id } = req.params;
    const message = praises.find((praise) => praise.id == id);

    if (!message) {
        res.status(404).send('Praise not found');
        return;
    }

    res.render('message', {message: message});
}