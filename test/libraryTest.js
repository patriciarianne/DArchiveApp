const Library = artifacts.require("./Library.sol")

contract("Library", async (accounts) => {
  let library

  beforeEach('Deploy contract', async () => {
    // library = await Library.new({ from: accounts[0], gas: 6000000})
    library = await Library.deployed()
  })

  describe('Initial tests for Library contract', () => {
    it('should have zero book count', async () => {
      const booksCount = await library.getBookCount()
      assert.equal(booksCount, 0);
    })
  })

  describe('Main functions of the Library contract', () => {
    it('should add the book', async () => {
      await library.addBook(
        'Test book',
        'Test description',
        'Test genre',
        10,
        'testLinkHash',
        'testImageHash',
        { from: accounts[0] }
      )
      const booksCount = await library.getBookCount()
      assert.equal(booksCount, 1);
    })

    it('should get the book count', async () => {
      await library.addBook(
        'Test2 book',
        'Test2 description',
        'Test2 genre',
        10,
        'test2LinkHash',
        'test2ImageHash',
        { from: accounts[1] }
      )
      await library.addBook(
        'Test3 book',
        'Test3 description',
        'Test3 genre',
        10,
        'test3LinkHash',
        'test3ImageHash',
        { from: accounts[1] }
      )
      const booksCount = await library.getBookCount()
      assert.equal(booksCount, 3);
    })

    it('should get the book by index', async () => {
      const [title, description, author, genre, price, linkHash, imageHash] = await library.getBookAt(0)
      assert.equal(title, 'Test book')
      assert.equal(description, 'Test description')
      assert.equal(author, accounts[0])
      assert.equal(genre, 'Test genre')
      assert.equal(price, 10)
      assert.equal(linkHash, 'testLinkHash')
      assert.equal(imageHash, 'testImageHash')
    })
  })

  it('should remove the book by index', async () => {
    await library.removeBook(1)
    const booksCount = await library.getBookCount()
      assert.equal(booksCount, 2);
  })

})