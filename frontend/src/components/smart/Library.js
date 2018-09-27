import React, { Component } from 'react'
import BookList from '../dumb/BookList'
import { Button } from 'reactstrap'
import ethers from 'ethers'
import { getBookCount, getBookAt, getIsBookAuthor } from '../../helpers/libraryContract'

class Library extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }

    this.redirectToFile = this.redirectToFile.bind(this)
  }

  async componentDidMount() {
    let books = []
    const bookCount = await getBookCount()
    for (let index = 0; index < bookCount; index++) {
      let book = await getBookAt(index)
      // const isBookAuthor = await getIsBookAuthor(index)
      const price = ethers.utils.formatEther(book.price)
      const newBook = {...book, price}
      books.push(newBook)
    }
    this.setState({ books })
  }

  redirectToFile(fileHash) {
   console.log(`https://gateway.ipfs.io/ipfs/${fileHash}`)
  }

  // async isBookAuthor(index) {
  //   return await getIsBookAuthor(index)
  // }

  render() {
    return (
      <div>
        <BookList books={this.state.books} redirectToFile={this.redirectToFile}/>
      </div>
    )
  }
}

export default Library