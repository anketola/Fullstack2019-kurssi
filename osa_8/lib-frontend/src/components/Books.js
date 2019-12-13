import React from 'react'

const Books = (props) => {
  console.log(props.result)
  
  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }
  const books = props.result.data.allBooks.filter(entry => {
    if (props.genre.length === 0) {
      return entry
    } else {
      return entry.genres.includes(props.genre)
    }
  })
  console.log('books after ', books)
  const genres = props.allGenres.data.allBooks
  const genreTestList = ['Horror', 'Comedy', 'Academic']

  console.log(genres)
  //console.log(props)
  const displayGenreButtons = () => {
    const genreButtons = genres.map(books => books.genres).reduce((prev, next) => prev.concat(next))
    genreButtons.filter((g, i) => genreButtons.indexOf(g) === i)
    return genreButtons
  }
  //console.log(genreButtons)
  return (
    <div>
      <h2>books</h2>
      <strong>Filter by genre</strong><br />
      {displayGenreButtons().map(genre => 
        <button key={genre} 
          onClick={({ target }) => props.setGenre(target.textContent)}>
            {genre}
        </button>)
      }
      <button onClick={({ target }) => props.setGenre('')}>view in all genres</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books