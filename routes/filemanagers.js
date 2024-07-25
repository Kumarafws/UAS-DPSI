var express = require('express');
var router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
var Filemanager = require('../models/filemanager');

router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Filemanagers = await Filemanager.findAll();
        res.json(Filemanagers);
    } catch (err) {
        next(err);
    }
});

router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { userID, fileID, folderID } = req.body;
        const newFilemanager = await Filemanager.create({ userID, fileID, folderID });
        res.status(201).json(newFilemanager);
    } catch (err) {
        next(err);
    }
});

router.put('/:filemanagerID', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { userID, fileID, folderID } = req.body;
        const Filemanagers = await Filemanager.findByPk(req.params.filemanagerID);
        if (Folders) {
            Filemanagers.userID = userID;
            Filemanagers.fileID = fileID;
            Filemanagers.folderID = folderID;
            await Filemanagers.save();
            res.json(Filemanagers);
        } else {
            res.status(404).json({ message: 'Filemanager not Found' });
        }
    } catch (err) {
        next(err);
    }
});

router.delete('/:filemanagerID', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Filemanagers = await Filemanager.findByPk(req.params.filemanagerID);
        if (Filemanagers) {
            await Filemanagers.destroy();
            res.json({ message: 'Filemanager Deleted' });
        } else {
            res.status(404).json({ message: 'Filemanager not Found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;