import {currentNetwork, getFeeLimit, nameRemoveSuffix, tronWebInstance} from './utils'

/* Utils */
let snsContract = null

export const contractAddress = {
  shasta: {
    registry: 'TQzS8iHCsTH9a5Ko16N9rSZ8EpsvoVMTDK'
  },
  nile: {
    registry: 'TRFf84GkYFx6NHHjoKUTHxEPYEKuRqb69D'
  }
}

export async function setup() {
  // TODO: obtain current network,auto switch
  if (currentNetwork() == 'nile') {
    snsContract = await tronWebInstance().contract().at(contractAddress.nile.registry);
  } else if (currentNetwork() == 'shasta') {
    snsContract = await tronWebInstance().contract().at(contractAddress.shasta.registry);
  }
  return snsContract;
}

/* Main methods */
//Get the number of castings in the system

//registry
export async function registry(name) {
  let value = await getRegisteredPrice()
  return await snsContract.mint(nameRemoveSuffix(name)).send({
    feeLimit: getFeeLimit(),
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
    feeLimit: getFeeLimit(),
    callValue: 0,
    shouldPollResponse: true
  });
}

//Custom parser
export async function setResolverInfo(name, address) {
  return await snsContract.setResolverInfo(nameRemoveSuffix(name), address).send({
    feeLimit: getFeeLimit(),
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

