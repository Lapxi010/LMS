import {PrismaClient} from '@prisma/client';
const db = new PrismaClient();
export const createCourse = async (req, res) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: req.userId
            }
        })
        const {title, description, shortDesc} = req.body

        const course = await db.course.create({
            data: {
                title,
                description,
                shortDesc,
                titleImg: 'null',
                userId: req.userId
            }
        });
        res.status(200).json({
            message: 'Ok'
        })
    } catch (e) {
        return res.status(500).json({
            message: 'Не удалось сделать запрос'
        });
    }
}

export const getAllCourses = async (req, res) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: req.userId
            }
        })

        let courses;
        if (user.role === 'teacher') {
            courses = await db.course.findMany({
                where:{
                    userId: req.userId
                }
            })
        }else {
            courses = await db.course.findMany()
        }
        res.status(200).json({
            courses
        })
    } catch (e) {
        return res.status(500).json({
            message: 'Не удалось сделать запрос'
        });
    }
}

export const getCourse = async (req, res) => {
    try {
        const {id} = req.params

        const course = await db.course.findUnique({
            where: {
                id
            },
            include: {
                lessons: true
            }
        })

        res.status(200).json({
            course
        })
    } catch (e) {
        return res.status(500).json({
            message: 'Не удалось сделать запрос'
        });
    }
}

export const createLesson = async (req, res) => {
    try {
        const userId = req.userId
        const {id} = req.params
        const {title, description} = req.body

        const lesson = await db.lesson.create({
            data: {
                title: title,
                description: description,
                courseId: id,
                userId: null,
                titleImg: '',
                shortImgs: [],
                comments: [],
                srcVideo: '',
                srcDoc: [],
                rating: '',
                tags: []
            }
        });
        console.log(lesson)
        res.status(200).json({
            lesson
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Не удалось сделать запрос'
        });
    }
}