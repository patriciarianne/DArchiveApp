import React, { Component } from 'react'
import BookList from '../dumb/BookList'
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap'
import ethers from 'ethers'
import { getBookCount, getBookAt, getIsBookAuthor } from '../../helpers/libraryContract'

class Library extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }

    this.redirectToBook = this.redirectToBook.bind(this)
  }

  async componentDidMount() {
    let books = []
    const bookCount = await getBookCount()
    for (let index = 0; index < bookCount; index++) {
      let book = await getBookAt(index)
      // const isBookAuthor = await getIsBookAuthor(index)
      const price = ethers.utils.formatEther(book.price)
      const newBook = {...book, price, index}
      books.push(newBook)
    }
    this.setState({ books })
  }

  redirectToBook(index) {
   this.props.history.push(`book/${index}`)
  }

  render() {
    return (
      <div>
        <BookList books={this.state.books} redirectToBook={this.redirectToBook}/>
      </div>
    )
  }
}

export default withRouter(Library)