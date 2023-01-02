import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import schema from './types.graphql';
import {queries as bookQueries} from "./bus/books/queries";
import {queries as starshipQueries} from "./bus/starships/queries";
import {queries as usersQueries} from "./bus/users/queries"
import {mutations as bookMutations} from "./bus/books/mutations";
import {mutations as userMutations} from "./bus/users/mutations";
import {api as starshipsApi} from "./bus/starships/dataSource";
import session from 'express-session';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const USER_SECRET = 'secret';
const PORT = 4000;
const sessionsOptions = {
	key: 'token',
	secret: USER_SECRET,
	resave: false,
	rolling: true,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		maxAge: 1000 * 60 * 15,
	}
}



const readToken = (req, res, next) => {
	const {token} = req.session;
	if(token) {
		const {username} = jwt.verify(token, USER_SECRET);
		req.username = username;
	}
	next()
}

const resolvers = {
	Query: {
		...bookQueries,
		...starshipQueries,
		...usersQueries
	},
	Mutation: {
		...bookMutations,
		...userMutations
	}
};


const app = express();



const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	dataSources: () => {
		return {
			starshipsApi
		};
	},
	context: ({req, res}) => {
		return {
			req, res
		}
	},
	playground: {
		settings: {
			'request.credentials': 'include'
		}
	}
});
const corsOptions = {
	origin: `https://studio.apollographql.com`,
	credentials: true,
}
app.use(cors(corsOptions));
app.use(session(sessionsOptions));
app.use(readToken);
server.start().then(() => {
	server.applyMiddleware({ app , cors: false});
	app.listen({port: PORT}, () => {
		console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
	});
});






