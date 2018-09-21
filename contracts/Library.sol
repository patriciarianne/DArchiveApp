pragma solidity ^0.4.24;
import './safemath.sol';

contract BookLibrary {
  using SafeMath for uint;
  struct Book {
    string title;
    string description;
    address author;
    string genre;
    string linkHash;
    string imageHash;
  }

  Book[] private books;
  uint lastAvailableIndex;

  modifier isBookAvailable(uint _index) {
    require(getBookCount() > 0 && _index < lastAvailableIndex);
    _;
  }
  
  modifier isBookAuthor(address _author) {
    require(_author == msg.sender);
    _;
  }

  function addBook(string _title, string _description, string _genre, string _linkHash, string _imageHash) public {
    Book memory newBook = Book(
      _title,
      _description,
      msg.sender,
      _genre,
      _linkHash,
      _imageHash
    );

    books.push(newBook);
    lastAvailableIndex = lastAvailableIndex.add(1);
  }

  function getBookCount() public view returns (uint) {
    return books.length;
  }
  
  function getBookAt(uint _index) public view isBookAvailable(_index) returns (string title, string description, address author, string genre, string linkHash, string imageHash) {
    Book memory retrievedBook = books[_index];
    return (
      retrievedBook.title,
      retrievedBook.description,
      retrievedBook.author,
      retrievedBook.genre,
      retrievedBook.linkHash,
      retrievedBook.imageHash
      );
  }

  function removeBook(uint _index, address _author) public isBookAuthor(_author) {
    uint lastIndex = lastAvailableIndex - 1;
    books[_index] = books[lastIndex];
    lastAvailableIndex = lastAvailableIndex.sub(1);
    
  }
}