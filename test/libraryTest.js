const Library = artifacts.require("./Library.sol")
const ETHER = 10 ** 18

contract("Library", async (accounts) => {
  let library

  beforeEach('Deploy contract', async () => {
    library = await Library.deployed()
  })

  describe('Initial tests for Library contract', () => {
    it('should have zero book count', async () => {
      const booksCount = await library.getBookCount()
      assert.equal(booksCount, 0);
    })

    it('should have zero contract balance', async () => {
      const contractBalance = await library.getContractBalance()
      assert.equal(contractBalance, 0);
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
      const booksCount2 = await library.getBookCount()
      assert.equal(booksCount2, 3);
    })

    it('should get the book by index', async () => {
      const [title, description, author, genre, price, linkHash, imageHash] = await library.getBookAt(0)
      assert.equal(title, 'Test book')
      assert.equal(description, 'Test description')
      assert.equal(author, accounts[0])
      assert.equal(genre, 'Test genre')
      assert.equal(price, 10 * 10 **18)
      assert.equal(linkHash, 'testLinkHash')
      assert.equal(imageHash, 'testImageHash')
    })

    it('should not return a book that does not exist', async () => {
      let error = null
      try {
        await library.getBookAt(5)
      } catch (err) {
        error = err
      }
      assert.notEqual(error, null)
    })

    it('should remove the book by index', async () => {
      await library.removeBook(1, { from: accounts[1] })
      const booksCount = await library.getBookCount()
      assert.equal(booksCount, 2)
      try {
        await library.getBookAt(1)
      } catch (error) {
        assert.equal(error, 'Book is not available')
      }
    })
  
    it('should not remove the book when user is not the author', async () => {
      let error = null
      try {
        await library.removeBook(0, { from: accounts[1] })
      } catch (err) {
        error = err
      }
      assert.notEqual(error, null)
    })  

    it('should buy the book by index', async () => {
      await library.buyBook(1, { from: accounts[0], value: 10 * ETHER})
      const contractBalance = await library.getContractBalance()
      assert.equal(contractBalance, (10 * ETHER  * 5)/100)
    })

    it('should not buy the book if the value is not equal to the book price', async () => {
      let error = null
      try {
        await library.buyBook(1, { from: accounts[0], value: 1 * ETHER })
      } catch (err) {
        error = err
      }
      const contractBalance = await library.getContractBalance()
      
      assert.notEqual(error, null)
      assert.equal(contractBalance, (10 * ETHER  * 5)/100)
    })
    
    it('should not buy the book if the user is the author of the book', async () => {
      let error = null
      try {
        await library.buyBook(1, { from: accounts[1], value: 10 * ETHER})
      } catch (err) {
        error = err
      }
      const contractBalance = await library.getContractBalance()
      
      assert.notEqual(error, null)
      assert.equal(contractBalance, (10 * ETHER * 5)/100)
    })

    it('should not buy the book if the user is the author of the book and the value is not equal to the book price', async () => {
      let error = null
      try {
        await library.buyBook(1, { from: accounts[1], value: 5 * ETHER })
      } catch (err) {
        error = err
      }
      const contractBalance = await library.getContractBalance()
      
      assert.notEqual(error, null)
      assert.equal(contractBalance, (10 * ETHER * 5)/100)
    })

    it('should get balance of the user', async () => {
      const testBalance = (10 * ETHER  * 95)/100
      const balance = await library.getBalance({ from: accounts[1]})
      assert.equal(balance, testBalance)
    })

    it('should withdraw balance of the user', async () => {
      await library.withdrawBalance({ from: accounts[1] })
      const balance = await library.getBalance({ from: accounts[1] })
      assert.equal(balance, 0)
    })

    it('should return true if the user is the book author', async () => {
      const isAuthor = await library.getIsBookAuthor(1, { from: accounts[1] })
      assert.equal(isAuthor, true)
    })
  })
})