import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const getBooks = async () => {
    const result = await prisma.book.findMany();
    if (result === null) {
        throw new Error("Book not found");
    }
    return result;
}

export const getBook = async (id) => {
    const result = await prisma.book.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (result === null) {
        throw new Error("Book not found");
    }
    return result;
}

export const saveBook = async (book) => {
    const result = await prisma.book.create({
        data: {
            ...book
        }
    });
    if (result === null) {
        throw new Error("Book not found");
    }
    return result;
}

export const removeBook = async (id) => {
    const result = await prisma.book.delete({
        where: {
            id: Number(id)
        }
    });
    if (result === null) {
        throw new Error("Book not found");
    }
    return result;
}

export const updateBook = async ({id, book}) => {
    const result = await prisma.book.update({
        where: {
            id: Number(id)
        },
        data: {
            ...book
        }
    });
    if (result === null) {
        throw new Error("Book not found");
    }
    return result;
}
