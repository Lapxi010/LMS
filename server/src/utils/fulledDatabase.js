import {PrismaClient} from "@prisma/client";
import {v4} from "uuid";
const db = new PrismaClient();

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let names = ['Александр', 'Илья', 'Марк', 'Иван', 'Матвей', 'Савва', 'Али', 'Леонид', 'Мирослав', 'Денис']
let surnames = ['Авдеев', 'Булгаков', 'Буров', 'Быков', 'Верещагин', 'Вишневский', 'Волков', 'Воробьев', 'Воронов', 'Гончаров']
let fatherland = ['Матвеевич', 'Максимович', 'Леонидович', 'Александрович', 'Дмитриевич', 'Алексеевич', 'Иванович', 'Адамович', 'Михайлович', 'Семёнович']
let sex = 'male'
let role = ['teacher', 'children']

let res = []

const generateRandomUsers = async () => {
    for(let i = 0; i <= 70110; i++) {
        let tmp = {
            fio: null,
            email: null,
            password: null,
            sex: null,
            role: null,
            phone: null,
            activationLink: null
        }
        let one = getRandomIntInclusive(0, 9);
        let two = getRandomIntInclusive(0, 9);
        let three = getRandomIntInclusive(0, 9);
        tmp.fio = names[one] + ' ' + surnames[two] + ' ' + fatherland[three]
        let four = getRandomIntInclusive(0, 1);
        tmp.role = role[four]
        tmp.sex = sex
        let five = getRandomIntInclusive(0, 10000);
        tmp.email = `testgmail${five}@gmail.com`
        let six = getRandomIntInclusive(1111111111, 11111111111111111111111111111111111111)
        tmp.phone = String(getRandomIntInclusive(4234242323, 9999999999))
        const activationLinkd = v4();
        tmp.activationLink = activationLinkd
        tmp.password = String(six)
        try {
            await db.user.create({
                data: tmp
            })
        } catch (e) {
            console.log(1)
        }
    }
}

generateRandomUsers()