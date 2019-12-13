const { ApolloServer, gql, UserInputError } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

const MONGODB_URI = config.MONGODB_URI
const JWT_SECRET = config.JWT_SECRET
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User
  }

  type Book {
    title: String!
    author: Author
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }

`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      authorsall = await Author.find({})
      return authorsall
    },
    allBooks: async (root, args) => {
      console.log(args)
      /*if (args.author && !args.genre) {
        return books.filter(b => b.author === args.author)
      }
      */
      if (!args.author && args.genre) {
        return await Book.find({ genres: { $in: args.genre }})
      }
      if (args.author && args.genre) {
        return await Book.find({ genres: { $in: args.genre }})
      }
      
      return await Book.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      return Book.collection.countDocuments({ author: root._id})
    }
  },
  Book: {
    author: async root => {
      const author = await Author.findById(root.author._id)
      return { name: author.name, born: author.born }
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const loggedUser = context.currentUser
      if (!loggedUser) {
        throw new AuthenticationError("not authenticated")
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        try {
        author = new Author({ name: args.author })
        await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      try {
      const book = new Book({ ...args, author: author._id })
      await book.save()
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
      }
    },
    editAuthor: async (root, args, context) => {
      const loggedUser = context.currentUser
      if (!loggedUser) {
        throw new AuthenticationError("not authenticated")
      }
      const authorexists = await Author.findOne({ name: args.name })
      if (!authorexists) {
        return null
      }
      authorexists.born = args.setBornTo
      await authorexists.save()
      return authorexists
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl  }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})