import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import schema from './schema.graphql';
import {getBooks, getBook, saveBook, removeBook, updateBook} from './model.js'

const resolvers = {
	Query: {
		books: () => getBooks(),
		book: (_, {id}) => getBook(id)
	},
	Mutation: {
		addBook: (_, {book}) => saveBook(book),
		removeBook: (_, {id}) => removeBook(id),
		updateBook: (_, {id, book}) => updateBook({id, book})
	}
};

const PORT = 4000;

const app = express();

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
});

server.start().then(() => {
	server.applyMiddleware({ app });
	app.listen({port: PORT}, () => {
		console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
	});
});






