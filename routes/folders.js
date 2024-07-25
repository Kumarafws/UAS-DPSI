var express = require('express');
var router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
var Folder = require('../models/folder');

router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Folders = await Folder.findAll();
        res.json(Folders);
    } catch (err) {
        next(err);
    }
});

router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { folderName, folderPath } = req.body;
        const newFolder = await Folder.create({ folderName, folderPath });
        res.status(201).json(newFolder);
    } catch (err) {
        next(err);
    }
});

router.put('/:folderID', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { folderName, folderPath } = req.body;
        const Folders = await Folder.findByPk(req.params.folderID);
        if (Folders) {
            Folders.folderName = folderName;
            Folders.folderPath = folderPath;
            await Folders.save();
            res.json(Folders);
        } else {
            res.status(404).json({ message: 'Folder not Found' });
        }
    } catch (err) {
        next(err);
    }
});

router.delete('/:folderID', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Folders = await Folder.findByPk(req.params.folderID);
        if (Folders) {
            await Folders.destroy();
            res.json({ message: 'Folder Deleted' });
        } else {
            res.status(404).json({ message: 'Folder not Found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;