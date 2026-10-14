const express = require("express");
const masterController = require("../controllers/MasterController");

const router = express.Router();

router.get('/', (req, res) =>
    masterController.getAll(req, res)
);

router.get('/search', (req, res) =>
    masterController.searchByName(req, res)
);
router.get('/:id', (req, res) =>
    masterController.getMasterById(req, res)
);

router.post('/', (req, res) =>
    masterController.create(req, res)
);

router.patch('/:id', (req, res) =>
    masterController.edit(req, res)
);

router.delete('/:id', (req, res) =>
    masterController.deleteMaster(req, res)
);

module.exports = router;

