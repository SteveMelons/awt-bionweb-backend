import express from "express";
var router = express.Router();


router.get('/user/update', (req, res, next) => {
    res.send('update student')
});


router.get('/user/delete', (req, res, next) => {
    res.send('delete student')
});

router.get('/user/profile/:id', (req, res, next) => {
    res.send(`profile of student with id ${req.params.id}`)
});

router.get('/students/matches', (req, res, next) => {
    res.send('matches')
});

router.get('/students/:filters', (req, res, next) => {//TODO to specify which filters do we need
    res.send('filterd students')
});


router.get('/favorites', (req, res, next) => {
    res.send('favorite')
});


router.get('/favorites/add', (req, res, next) => {
    res.send('add favorite')
});

router.get('/favorites/remove/:id', (req, res, next) => {
    res.send(`favorite with id ${req.params.id} will be removed`)
});


export {router};