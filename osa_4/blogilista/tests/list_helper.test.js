const listHelper = require('../utils/list_helper')

const emptyList = []
  
  const listWithOneBlog = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    }
   ]
  
  const listWithSixBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

describe('total likes', () => {
  
  test('likes of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)    
  })

  test('likes of list with one blog calculated correctly', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)    
  })

  test('big blog list likes calculated correctly', () => {
    const result = listHelper.totalLikes(listWithSixBlogs)
    expect(result).toBe(36)    
  })

})

describe('favorite blogs', () => {

  test('gives correct blog with list of one', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('gives undefined with an empty list', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toEqual(undefined)
  })

  test('gives correct blog with a big list', () => {
    const result = listHelper.favoriteBlog(listWithSixBlogs)
    expect(result).toEqual(listWithSixBlogs[2])
  })

})

describe('most blogs written', () => {

  test('correct author with a big list', () => {
    const result = listHelper.mostBlogs(listWithSixBlogs)
    
    const correctResult = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(result).toEqual(correctResult)
  })

  test('correct author with a list of one', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    
    const correctResult = {
      author: "Michael Chan",
      blogs: 1
    }
    expect(result).toEqual(correctResult)
  })

  test('undefined with an empty list', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toEqual(undefined)
  })
})

describe('most likes for an author', () => {

  test('correct author with a big list', () => {
    const result = listHelper.mostLikes(listWithSixBlogs)
    
    const correctResult = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(result).toEqual(correctResult)

  })

  test('undefined with an empty list', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toEqual(undefined)
  })

  test('correct author with a list of one', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    
    const correctResult = {
      author: "Michael Chan",
      likes: 7
    }
    expect(result).toEqual(correctResult)
  })

})