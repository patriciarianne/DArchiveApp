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
  uint private lastAvailableIndex;
  mapping (address => uint) private balances;
  uint private contractBalance;

  event BookAdded(
    string title,
    string description,
    address author,
    string genre,
    uint price,
    string linkHash,
    string imageHash,
    uint index
  );

   event BookRemoved(
    string title,
    string description,
    address author,
    string genre,
    uint price,
    string linkHash,
    string imageHash,
    uint index
  ); 

  modifier isBookAvailable(uint _index) {
    require(getBookCount() > 0 && _index < lastAvailableIndex, 'Book is not available');
    _;
  }
  
  modifier isBookAuthor(uint _index) {
    require(books[_index].author == msg.sender, 'Not the author of the book');
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
      _price * 10 ** 18, 
      _linkHash,
      _imageHash
    );

    books.push(newBook);
    emit BookAdded(
      newBook.title,
      newBook.description,
      newBook.author,
      newBook.genre,
      newBook.price, 
      newBook.linkHash,
      newBook.imageHash,
      lastAvailableIndex
    );
    lastAvailableIndex = lastAvailableIndex.add(1);
  }

  function getBookCount() public view returns (uint) {
    return lastAvailableIndex;
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
    Book memory book = books[_index];

    books[_index] = books[lastIndex];
    lastAvailableIndex = lastAvailableIndex.sub(1);

    emit BookRemoved(
      book.title,
      book.description,
      book.author,
      book.genre,
      book.price, 
      book.linkHash,
      book.imageHash,
      lastAvailableIndex
    );
  }

  function buyBook(uint _index) public canBuy(_index) payable {
    address author = books[_index].author;
    contractBalance = contractBalance.add((msg.value * 5)/100);
    balances[author] = balances[author].add((msg.value * 95)/100);
  }

  function getBalance() public view returns (uint) {
    return balances[msg.sender];
  }
  
  function withdrawBalance() public {
    uint balance = balances[msg.sender];
    balances[msg.sender] = 0;
    msg.sender.transfer(balance);
  }

  function getContractBalance() public view returns (uint) {
    return contractBalance;
  }

  function getIsBookAuthor(uint _index) public view isBookAuthor(_index) returns (bool) {
    return true;
  }
}