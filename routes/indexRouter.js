import { Router } from "express";

export const indexRouter = Router();

const praises = [
  {
    text: "You are the cutest fluffball!",
    user: "Yuki",
    date: new Date()
  },
  {
    text: "Best cat evurrr!",
    user: "Yuki",
    date: new Date()
  }
];

indexRouter.get('/', (req, res) => {
    res.render('index', { message: 'hello moo, the greatest cat!', praises: praises });
})

indexRouter.get('/new', (req, res) => {
    res.render('form');
})

indexRouter.post('/new', (req, res) => {
    praises.push({ text: req.body.praise, user: req.body.name, date: new Date() });
    res.redirect('/');
})