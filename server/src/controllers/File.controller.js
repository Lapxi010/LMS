import {PrismaClient} from '@prisma/client';

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

export const getPdf = async (req, res) => {
    res.status(200).sendFile(__dirname + '../static/1.pdf');
}