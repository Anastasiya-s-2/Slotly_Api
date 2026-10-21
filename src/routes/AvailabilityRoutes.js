const express = require("express");
const arController = require("../controllers/AvailabilityRulesController");
const router = express.Router();

router.get('/', (req, res) =>
    arController.getAll(req, res)
);

router.get('/search', (req, res) =>
   arController.searchByWeekday(req, res)
);

router.get('/:id', (req, res) =>
    arController.getById(req, res)
);

router.get('/masters/:id', (req, res) =>
    arController.getByMasterId(req, res)
);

router.post('/', (req, res) =>
    arController.create(req, res)
);

router.patch('/:id', (req, res) =>
    arController.edit(req, res)
);

router.delete('/:id', (req, res) =>
    arController.delete(req, res)
);

module.exports = router;

