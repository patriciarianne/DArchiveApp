pragma solidity ^0.4.24;

contract BookLibrary {
  struct Book {
    string title;
    string description;
    address author;
    string genre;
    string linkHash;
    string imageHash;
  }

  // mapping (uint => Book) private books;
  // uint[] private availableIndices;
  mapping (string => Book[]) private availableBooks;
  mapping (string => uint[]) private availableIndices;

  modifier isBookAvailable(uint _index, string _genre) {
    require(availableBooks[_genre].length > 0);
    _;
  }
  
  modifier isBookAuthor(address _author) {
    require(_author == msg.sender);
    _;
  }

  function addBook(string _title, string _description, string _genre, string _linkHash, string _imageHash) public {
    Book memory newBook;
    newBook.title = _title;
    newBook.description = _description;
    newBook.author = msg.sender;
    newBook.genre = _genre;
    newBook.linkHash = _linkHash;
    newBook.imageHash = _imageHash;

    availableBooks[_genre][availableIndices[_genre].length] = newBook;
    availableIndices[_genre].push(availableIndices[_genre].length);
  }

  function getBookCount(string _genre) public view returns (uint) {
    return availableIndices[_genre].length;
  }
  
  function getBookAt(uint _index, string _genre) public view isBookAvailable(_index, _genre) returns (string title, string description, address author, string genre, string linkHash, string imageHash) {
    
    return (
      availableBooks[_genre][_index].title,
      availableBooks[_genre][_index].description,
      availableBooks[_genre][_index].author,
      availableBooks[_genre][_index].genre,
      availableBooks[_genre][_index].linkHash,
      availableBooks[_genre][_index].imageHash
      );
  }

}