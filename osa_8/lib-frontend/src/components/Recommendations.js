import React from 'react'

const Recommendations = (props) => {

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  console.log('props', props)
  console.log('rec oli ', props.userFav.data.me.favoriteGenre)
  const genreSelect = props.userFav.data.me.favoriteGenre
  const books = props.result.data.allBooks.filter(entry => { return entry.genres.includes(genreSelect) })
  console.log('post filter kirjat ', books)

  return (
    <div>
        <h2>recommendations</h2>
        <p>books in your favourite genre <strong>{genreSelect}</strong></p>
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

export default Recommendations