import {PrismaClient} from '@prisma/client';
const db = new PrismaClient();
export const createCourse = async (req, res) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: req.userId
            }
        })
        const {title, description, shorDesc} = req.body

        const course = await db.course.create({
            data: {
                title,
                description,
                shorDesc,
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