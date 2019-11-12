const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const config = require('./utils/config')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = config.MONGODB_URI
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
    }
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
      return book
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
      }
    },
    editAuthor: async (root, args) => {
      const authorexists = await Author.findOne({ name: args.name })
      if (!authorexists) {
        return null
      }
      authorexists.born = args.setBornTo
      await authorexists.save()
      return authorexists
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})