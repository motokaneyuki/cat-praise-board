import { Router } from "express";
import { createPraise, getUpdateForm, updatePraiseById, deletePraise, getForm, getPraiseById, getPraises, getNamePraiseList, getSignUpForm } from "../controller/praiseController.js";

export const indexRouter = Router();

indexRouter.get('/', getPraises);

indexRouter.get('/new', getForm);

indexRouter.post('/new', createPraise);

indexRouter.get('/message/:id', getPraiseById);

indexRouter.get('/update/:id', getUpdateForm);
indexRouter.post('/update/:id', updatePraiseById);

indexRouter.post('/delete/:id', deletePraise);

indexRouter.get('/search', getNamePraiseList);

indexRouter.get('/sign-up', getSignUpForm);
