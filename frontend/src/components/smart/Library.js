import React, { Component } from 'react'
import BookList from '../dumb/BookList'

class Library extends Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    const books = [
      {title: 'title', price: 10},
      {title: 'title2', price: 2},
      {title: 'title3', price: 22},
      {title: 'title4', price: 5},
      {title: 'title5', price: 23}
    ]
    return (
      <div>
        <BookList books={books} />
      </div>
    )
  }
}

export default Library