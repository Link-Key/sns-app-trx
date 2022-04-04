//import LibraryABI from './libraryABI'
import {setup as setupSNS} from './sns'
import {setup as setupSNSResolver} from './sns.resolver'

let account = null
// let libraryContractAddress = 'TZJbkRf2GCXQds2MzopQ3WhddXyWQGS8Ny' // Paste Contract address here
// let bookRentContract = null
let snsContract = null
let snsResolverContract = null
let tronWeb = null
let tronNetwork = null
let feeLimit = 1000_000_000

export const getFeeLimit = () => {
  return feeLimit
}

export function getAccount() {
  return account
}

export function getSNSInstance() {
  return snsContract
}

export function getSNSResolverInstance() {
  return snsResolverContract
}

export function setupTronWeb() {
  // Obtain the tronWeb object injected by tronLink
  var obj = setInterval(async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      clearInterval(obj)
      tronWeb = window.tronWeb
      await setup()
      console.log("tronWeb successfully detected!")
      console.log("[tronWeb]", tronWeb)
      console.log("[tronWeb.address]", tronWeb.defaultAddress.base58)
      // console.log("address: ", tronWeb.trx.getAccount(address));
    }
  }, 10)
  setTimeout('', 3000);
}

export const tronWebInstance = () => {
  return tronWeb
}

export async function setup() {
  // bookRentContract = await tronWeb.contract().at(libraryContractAddress);
  currentNetwork()
  account = tronWeb.defaultAddress.base58;
  if (tronWeb.fullNode.host !== 'https://api.shasta.trongrid.io') {
    console.log("Current Network: ", tronWeb.fullNode.host)
    alert('Please connect to the Shasta test network')
  }

  snsContract = await setupSNS();
  snsResolverContract = new setupSNSResolver();
}

export function currentNetwork() {
  let host = tronWeb.fullNode.host
  if (host === 'https://api.shasta.trongrid.io') {
    tronNetwork = 'shasta'
  } else if (host === 'https://api.nileex.io') {
    tronNetwork = 'nile'
  } else {
    tronNetwork = 'main'
  }
  return tronNetwork
}

//
// export async function postBookInfo(name, description, price) {
//   // TODO: call addBook func of library contract
//
//   const result = await bookRentContract.addBook(name, description, price).send({
//     feeLimit: 100_000_000,
//     callValue: 0,
//     shouldPollResponse: true
//   });
//
//   alert('Book Posted Successfully')
//
// }
//
// export async function borrowBook(spaceId, checkInDate, checkOutDate, totalPrice) {
//   // TODO: call borrowBook func of library contract
//
//   const result = await bookRentContract.borrowBook(spaceId, checkInDate, checkOutDate).send({
//     feeLimit: 100_000_000,
//     callValue: totalPrice,
//     shouldPollResponse: true
//   });
//
//   alert('Property Booked Successfully')
// }
//
// export async function fetchAllBooks() {
//   // TODO: call bookId func of library contract to abtain total books number
//   // iterate till book Id
//   // push each object to books array
//   const books = [];
//
//   const bookId = await bookRentContract.bookId().call();
//   //iterate from 0 till bookId
//   for (let i = 0; i < bookId; i++) {
//     const book = await bookRentContract.books(i).call()
//     if (book.name != "") // filter the deleted books
//     {
//       books.push(
//         {id: i, name: book.name, description: book.description, price: window.tronWeb.fromSun(book.price)}
//       )
//     }
//
//   }
//   return books
//
// }

/**
 * remove ‘.key’ Suffix
 * @param name
 * @returns {*}
 */
export function nameRemoveSuffix(name) {
  return name.split('.key')[0]
}