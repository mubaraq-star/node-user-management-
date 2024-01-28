const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


router.get('/', customerController.Homepage);
router.get('/about', customerController.Aboutpage);
router.get('/add', customerController.AddUser);
router.post('/add', customerController.PostUser);
router.get('/view/:id', customerController.view);
router.get('/edit/:id', customerController.edit);
router.post('/edit/:id', customerController.editpost);
router.post('/edit/:id', customerController.editpost);
router.delete('/edit/:id', customerController.deleteCustomer);
router.post('/search', customerController.searchCustomer);
module.exports = router;