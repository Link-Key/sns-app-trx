import {nameRemoveSuffix, tronWebInstance} from './utils'
import {SNSResolver} from "./sns.resolver";

/* Utils */
let snsContract = null

export const contractAddress = {
  main: {
    registry: ''
  },
  nile: {
    registry: 'TRFf84GkYFx6NHHjoKUTHxEPYEKuRqb69D'
  }
}

export async function setup() {
  snsContract = await tronWebInstance().contract().at(contractAddress.nile.registry);
  console.log("await getRegisteredPrice()", await getRegisteredPrice())
  return snsContract;
}

/* Main methods */
//Get the number of castings in the system

//registry
export async function registry(name) {
  let value = await getRegisteredPrice()
  return await snsContract.mint(nameRemoveSuffix(name)).send({
    feeLimit: 100_000_000,
    callValue: value,
    shouldPollResponse: true
  })
}

// async getShortNameAllowedlist(){
//   const address = await getAccount()
//   return  await this.SNS.getShortNameAllowedlist(address)
// }

// sns name transfer
export async function transfer(address, name) {
  return await snsContract.transfer(address, name).send({
    feeLimit: 100_000_000,
    callValue: 0,
    shouldPollResponse: true
  });
}

//Custom parser
export async function setResolverInfo(name, address) {
  return await snsContract.setResolverInfo(nameRemoveSuffix(name), address).send({
    feeLimit: 100_000_000,
    callValue: 0,
    shouldPollResponse: true
  });
}

//Get the registered SNSName by address
export async function getNameOfOwner(address) {
  return await snsContract.getNameOfOwner(address).call()
}

//Get the resolver address through SNSName
export async function getResolverAddress(name) {
  return await snsContract.getResolverAddress(name).call()
}

//Get resolverOwner address
export async function getResolverOwner(name) {
  return await snsContract.getResolverOwner(name).call()
}

export async function getTokenIdOfName(name) {
  return await snsContract.getTokenIdOfName(name).call()
}

export async function getRegisteredPrice() {
  return await snsContract.getPrice().call()
}

//Get recordExists
export async function recordExists(name) {
  return await snsContract.recordExists(name).call()
}

// export class SNS {
//   constructor() {
//     this.SNS = tronWebInstance().contract().at(contractAddress.nile.registry)
//     console.log("this.SNS", this.SNS)
//   }
//
//   /* Get the raw Ethers contract object */
//   getSNSContractInstance() {
//     return this.SNS
//   }
//
//   /* Main methods */
//   //Get the number of castings in the system
//
//   //registry
//   async registry(name) {
//     const value = await this.getRegisteredPrice().call()
//     return await this.SNS.mint(nameRemoveSuffix(name)).send({
//       feeLimit: 100_000_000,
//       callValue: value,
//       shouldPollResponse: true
//     })
//   }
//
//   // async getShortNameAllowedlist(){
//   //   const address = await getAccount()
//   //   return  await this.SNS.getShortNameAllowedlist(address)
//   // }
//
//   // sns name transfer
//   async transfer(address, name) {
//     return await this.SNS.transfer(address, name).send({
//       feeLimit: 100_000_000,
//       callValue: 0,
//       shouldPollResponse: true
//     });
//   }
//
//   //Custom parser
//   async setResolverInfo(name, address) {
//     return SNS.setResolverInfo(nameRemoveSuffix(name), address).send({
//       feeLimit: 100_000_000,
//       callValue: 0,
//       shouldPollResponse: true
//     });
//   }
//
//   //Get the registered SNSName by address
//   async getNameOfOwner(address) {
//     return await this.SNS.getNameOfOwner(address).call()
//   }
//
//   //Get the resolver address through SNSName
//   async getResolverAddress(name) {
//     return await this.SNS.getResolverAddress(name).call()
//   }
//   //Get resolverOwner address
//   async getResolverOwner(name) {
//     return await this.SNS.getResolverOwner(name).call()
//   }
//
//   async getTokenIdOfName(name) {
//     return await this.SNS.getTokenIdOfName(name).call()
//   }
//
//   async getRegisteredPrice() {
//     return await this.SNS.getPrice().call()
//   }
//   //Get recordExists
//   async recordExists(name) {
//     return await this.SNS.recordExists(name).call()
//   }
//
// }
