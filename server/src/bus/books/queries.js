import {getBook, getBooks} from "./index";
import {ApolloError} from "apollo-server-express";

export const queries = {
    books: () => getBooks(),
    book: (_, {id}) =>
    {
        try{
            return getBook(id);
        }catch ({message}) {
            throw new ApolloError(message);
        }
    }
}
