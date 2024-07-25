const express = require('express');
const router = express.Router();
const File = require('../models/file'); // Impor model Category

// Endpoint untuk menambahkan kategori baru
router.post('/', async (req, res, next) => {
    try {
        const { fileName, ukuran, jenis } = req.body;
        const newFile = await File.create({ fileName, ukuran, jenis });
        res.status(201).json(newFile);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua kategori
router.get('/', async (req, res, next) => {
    try {
        const Files = await File.findAll();
        res.json(Files);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui kategori berdasarkan ID
router.put('/:fileID', async (req, res, next) => {
    try {
        const { fileName, ukuran, jenis } = req.body;
        const Files = await File.findByPk(req.params.fileID);
        if (Files) {
            Files.fileName = fileName;
            Files.ukuran = ukuran;
            Files.jenis = jenis;
            await Files.save();
            res.json(Files);
        } else {
            res.status(404).json({ message: 'File not found' });
        }
        } catch (err) {
            next(err);
        }
   });

   // Endpoint untuk menghapus kategori berdasarkan ID
   router.delete('/:fileID', async (req, res, next) => {
        try {
            const Files = await File.findByPk(req.params.fileID);
            if (Files) {
                await Files.destroy();
                res.json({ message: 'File deleted' });
            } else {
                res.status(404).json({ message: 'File not found' });
            }
        } catch (err) {
            next(err);
        }
   });
   
   module.exports = router;