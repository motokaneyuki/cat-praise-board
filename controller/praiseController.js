import { randomUUID } from "node:crypto";
import { body, validationResult, matchedData } from "express-validator";

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

//for creating praises

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
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).render('form', {
                errors: errors.array(),
            });
        }

        const { praise, name } = matchedData(req);
        praises.push({ text: praise, user: name, date: new Date(), id: randomUUID() });
        res.redirect('/');
    }
]

export const getPraiseById = (req, res) => {
    const { id } = req.params;
    const message = praises.find((praise) => praise.id == id);

    if (!message) {
        res.status(404).send('Praise not found');
        return;
    }

    res.render('message', {message: message});
}

//for updating praises

export const getUpdateForm = (req, res) => {
    const { id } = req.params;
    const message = praises.find((praise) => praise.id == id);

    if (!message) {
        return res.status(404).send('Praise not found');
    }

    res.render('update', {message: message});
}

export const updatePraiseById = [
    validatePraise,
    (req, res) => {
        const { id } = req.params;
        const updatedPraise = praises.find((praise) => praise.id == id);

        if (!updatedPraise) {
            res.status(404).send('Praise not found');
            return;
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).render('update', {
                errors: errors.array(),
                message: updatedPraise,
            });
        }

        const { praise, name } = matchedData(req);
        if (updatedPraise) {
            updatedPraise.text = praise;
            updatedPraise.user = name;
            updatedPraise.date = new Date();
        }

        res.redirect('/');
    }
]

//for deleting praises

export const deletePraise = (req, res) => {
    const { id } = req.params;
    const selectedPraiseIndex = praises.findIndex((praise) => praise.id == id);

    if (selectedPraiseIndex === -1) {
        return res.status(404).send('Praise not found');
    }

    praises.splice(selectedPraiseIndex, 1);

    res.redirect('/');
}

//for searching

export const getNamePraiseList = (req, res) => {
    const searchedName = req.query.search;

    const results = praises.filter((praise) => praise.user.toLowerCase() === searchedName.toLowerCase());

    res.render('search', { search: searchedName, results: results });
}