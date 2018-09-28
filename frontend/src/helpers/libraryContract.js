import { ethers, provider } from './ethersConfig'
import { abi, address } from './contractConfig'
import EtheriumClient from '../models/EtheriumClient'

const getLibraryContract = () => {
  const contract = new ethers.Contract(address, abi, provider)
  return contract
}

const setLibraryContract = (wallet) => {
  const etherWallet = new ethers.Wallet(wallet.privateKey, provider)
  const contract = new ethers.Contract(address, abi, etherWallet)
  return contract
}

const getBookCount = async () => {
  const library = getLibraryContract()
  const bookCount = await library.getBookCount()
  return bookCount
}

const addBook = async (book, wallet) => {
  const library = setLibraryContract(wallet)
  await library.addBook(
    book.title,
    book.description,
    book.genre,
    book.price,
    book.linkHash,
    book.imageHash
  )
}

const getBookAt = async (index) => {
  const library = getLibraryContract()
  const [title, description, author, genre, price, linkHash, imageHash] = await library.getBookAt(index)
  return {
    title,
    description,
    author,
    genre,
    price,
    linkHash,
    imageHash
  }
}

const removeBook = async (index, wallet) => {
  const library = setLibraryContract(wallet)
  try {
    await library.removeBook(index)
  } catch (error) {
    throw new Error(error)
  }
}

const getIsBookAuthor = async (index, wallet) => {
  const library = setLibraryContract(wallet)
  const isAuthor = await library.getIsBookAuthor(index)
  return isAuthor
}

const buyBook = async (index, value, wallet) => {
  const ethValue = ethers.utils.parseEther(value)
  const library = setLibraryContract(wallet)

  try {
    await library.buyBook(index, {value: ethValue})
  } catch (error) {
   throw new Error(error)
  }
}

const getBalance = async (wallet) => {
  const library = setLibraryContract(wallet)
  return await library.getBalance()
}

const withdrawBalance = async (wallet) => {
  const library = setLibraryContract(wallet)
  try {
    await library.withdrawBalance()
  } catch (error) {
    throw new Error(error)
  }
}

const getWallet = async (password) => {
  const jsonWallet = sessionStorage.getItem('jsonWallet')
  const decryptedWallet = await EtheriumClient.decryptWallet(jsonWallet, password)
  return decryptedWallet
}

export {
  getLibraryContract,
  getBookCount,
  addBook,
  getBookAt,
  removeBook,
  getIsBookAuthor,
  buyBook,
  getBalance,
  withdrawBalance,
  getWallet
}
