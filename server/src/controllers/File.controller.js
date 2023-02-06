import {PrismaClient} from '@prisma/client';
import fs from 'fs'

const db = new PrismaClient();
export const uploadVideo = async (req, res) => {
    const {id} = req.params

    if (req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }
    const file = req.files.file;
    if (!file) return res.json({msg: 'No file uploaded'});
    const newFileName = `${id}`;

    const lesson = await db.lesson.update({
        where: {
            id
        },
        data: {
            srcVideo: newFileName
        }
    })

    file.mv(`${__dirname}/../source/${newFileName}`, err => {
        if (err) {
            console.error(err);
            return res.status(500);
        }
        res.json({fileName: newFileName, filePath: `/source/${newFileName}.mp4`});
    });

}

export const uploadImage = async (req, res) => {
    const {id} = req.params

    if (req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }
    const file = req.files.file;
    if (!file) return res.json({msg: 'No file uploaded'});
    const newFileName = `TitleCourse${id}` + file.name;

    const course = await db.course.update({
        where: {
            id
        },
        data: {
            titleImg: newFileName
        }
    })

    file.mv(`${__dirname}/../static/${newFileName}`, err => {
        if (err) {
            console.error(err);
            return res.status(500);
        }
        res.json({fileName: newFileName, filePath: `/source/${newFileName}`});
    });
}

export const uploadDoc = async (req, res) => {
    const {id} = req.params

    if (req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }
    const file = req.files.file;
    if (!file) return res.json({msg: 'No file uploaded'});
    const newFileName = `TitleDoc${id}` + file.name;

    const course = await db.doc.create({
        data: {
            lessonId: id,
            title: 'just a title',
            src: newFileName,
        }
    })

    file.mv(`${__dirname}/../static/${newFileName}`, err => {
        if (err) {
            console.error(err);
            return res.status(500);
        }
        res.json({fileName: newFileName, filePath: `/source/${newFileName}`});
    });
}

export const getImage = async (req, res) => {
    const {id} = req.params;
    res.setHeader("Content-Disposition",`inline; filename="${id}"`)
    res.setHeader("Cache-Control", `public, max-age=${360 * 24 * 60 * 60 * 1000}`)
    fs.readFile(`${__dirname}/../static/${id}`, (err, image) => {
        res.sendFile(image)
    })
}

export const docDownload = async (req, res) => {
    try {
        const file = await db.doc.findUnique({
            where: {
                id: req.params.id
            }
        });

        const path = `${__dirname}/../static/${file.src}`
        if (fs.existsSync(path)) {
            return res.download(path, file.src)
        }
        return res.status(400).json({message: "Download error"})
    }catch (e) {
        res.status(500).json({
            message: 'Не удалось сделать запрос'
        });
    }
}