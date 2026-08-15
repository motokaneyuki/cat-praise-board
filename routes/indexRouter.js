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