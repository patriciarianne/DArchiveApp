pragma solidity ^0.4.24;
import './safemath.sol';

contract Library {
  using SafeMath for uint;
  
  struct Book {
    string title;
    string description;
    address author;
    string genre;
    uint price;
    string linkHash;
    string imageHash;
  }

  Book[] private books;
  uint lastAvailableIndex;
  uint private contractBalance;

  modifier isBookAvailable(uint _index) {
    require(getBookCount() > 0 && _index < lastAvailableIndex);
    _;
  }
  
  modifier isBookAuthor(uint _index) {
    require(books[_index].author == msg.sender);
    _;
  }

  modifier canBuy(uint _index) {
    require(books[_index].price == msg.value);
    require(books[_index].author != msg.sender);
    _;
  }

  function addBook(string _title, string _description, string _genre, uint _price, string _linkHash, string _imageHash) public {
    Book memory newBook = Book(
      _title,
      _description,
      msg.sender,
      _genre,
      _price * 10**18, 
      _linkHash,
      _imageHash
    );

    books.push(newBook);
    lastAvailableIndex = lastAvailableIndex.add(1);
  }

  function getBookCount() public view returns (uint) {
    return books.length;
  }
  
  function getBookAt(uint _index) public view isBookAvailable(_index) returns (string title, string description, address author, string genre, uint price, string linkHash, string imageHash) {
    Book memory retrievedBook = books[_index];
    return (
      retrievedBook.title,
      retrievedBook.description,
      retrievedBook.author,
      retrievedBook.genre,
      retrievedBook.price,
      retrievedBook.linkHash,
      retrievedBook.imageHash
      );
  }

  function removeBook(uint _index) public isBookAuthor(_index) {
    uint lastIndex = lastAvailableIndex - 1;
    books[_index] = books[lastIndex];
    lastAvailableIndex = lastAvailableIndex.sub(1);
  }

  function buyBook(uint _index) public canBuy(_index) payable {
    address author = books[_index].author;
    contractBalance = contractBalance.add((msg.value * 5)/100);
    author.transfer((msg.value * 95)/100);
  }

  function getContractBalance () public view returns (uint) {
    return contractBalance;
  }
}