const express = require("express");
const serviceController = require("../controllers/ServiceController");

const router = express.Router();

router.get('/', (req, res) =>
    serviceController.getAll(req, res)
);

router.get('/search', (req, res) =>
    serviceController.searchByName(req, res)
);

router.get('/master/:id', (req,res) =>
   serviceController.getByMasterId(req,res)
);

router.get('/:id', (req, res) =>
    serviceController.getServiceById(req, res)
);

router.post('/', (req, res) =>
    serviceController.create(req, res)
);
router.patch('/:id', (req, res) =>
    serviceController.edit(req, res)
);

router.delete('/:id', (req, res) =>
    serviceController.deleteService(req, res)
);

module.exports = router;

