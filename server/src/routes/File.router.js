import express from 'express';
const router = express.Router();

router.get('/getPdf', (req, res) => {
    res.status(200).sendFile(__dirname + '/static/1.pdf');
});

router.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;

    if (!file) return res.json({ msg: 'No file uploaded' });
    const newFileName = `${Date.now()}-${file.name}`;
    file.mv(`${__dirname}/source/${newFileName}`, err => {
        if(err) {
            console.error(err);
            return res.status(500);
        }
        res.json({ fileName: newFileName, filePath: `/source/${newFileName}` });
    });

});

export default router;
