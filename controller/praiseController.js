import { body, validationResult, matchedData } from "express-validator";
import { getAllPraises, addPraise, findPraiseByUser, deletePraiseById, findSpecificPraise, updatePraiseByUser } from "../db/queries.js";

export async function getPraises(req, res) {
    const praiseRows = await getAllPraises();
    res.render('index', { message: 'hello moo, the greatest cat!', praises: praiseRows });
}

export const getForm = (req, res) => {
    res.render('form');
}

// for creating praises

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters.';

const validatePraise = [
    body('name').trim()
    .isAlpha().withMessage(`Name ${alphaErr}`)
    .isLength({ min: 1, max: 10}).withMessage(`Name ${lengthErr}`),
    body('praise').trim()
    .isLength({ min:1, max: 100}).withMessage('Praise must be within 100 characters. Moo does not have the patience for more.'),
];

export const createPraise = [
    validatePraise,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).render('form', {
                errors: errors.array(),
            });
        }

        const { praise, name } = matchedData(req);
        const date = new Date();
        await addPraise(name, praise, date);
        res.redirect('/');
    }
]

export const getPraiseById = async (req, res) => {
    const { id } = req.params;
    const message = await findSpecificPraise(id);

    if (!message) {
        res.status(404).send('Praise not found');
        return;
    }

    res.render('message', {message: message});
}

//for updating praises

export const getUpdateForm = async (req, res) => {
    const { id } = req.params;
    const message = await findSpecificPraise(id);

    if (!message) {
        return res.status(404).send('Praise not found');
    }

    res.render('update', {message: message});
}

export const updatePraiseById = [
    validatePraise,
    async (req, res) => {
        const { id } = req.params;

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).render('update', {
                errors: errors.array(),
                message: { id: id, text: req.body.praise, user: req.body.name },
            });
        }

        const { praise, name } = matchedData(req);
        const date = new Date();
        await updatePraiseByUser(name, praise, date, id);

        res.redirect('/');
    }
]

//for deleting praises

export const deletePraise = async (req, res) => {
    const { id } = req.params;
    const deleted = await deletePraiseById(id);

    if (deleted === 0) {
        return res.status(404).send('Praise not found');
    }

    res.redirect('/');
}

//for searching

export const getNamePraiseList = async (req, res) => {
    const searchedName = req.query.search;
    const results = await findPraiseByUser(searchedName);
    console.log(results);
    res.render('search', { search: searchedName, results: results });
}