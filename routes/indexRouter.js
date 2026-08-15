import { Router } from "express";
import { createPraise, getForm, getPraiseById, getPraises } from "../controller/praiseController.js";

export const indexRouter = Router();

indexRouter.get('/', getPraises);

indexRouter.get('/new', getForm);

indexRouter.post('/new', createPraise);

indexRouter.get('/message/:id', getPraiseById);