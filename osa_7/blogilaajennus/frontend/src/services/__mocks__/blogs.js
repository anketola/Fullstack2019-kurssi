const testUser = {
  username: 'Testi Testi',
  name: 'Testi Testi'
}

const blogs = [
  {
    id: '123',
    title: 'Eka blogi',
    author: 'kirjoittaja 1',
    url: 'www.jotain.jotain',
    user: testUser,
    likes: 3
  },
  {
    id: '124',
    title: 'Toka blogi',
    author: 'kirjoittaja 2',
    url: 'www.jotainjotain.jotain',
    user: testUser,
    likes: 1
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }