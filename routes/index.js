const path = require('path');
const express = require('express'); // To import express middleware package
const rootDir = require('../util/path'); // To know the evn path
const router = express.Router(); //Import router package

const listController = require('../controllers/list'); //Import objects from product Controller

router.get('/list', listController.getList);
router.post('/list/search', listController.searchList);

exports.routes = router;

