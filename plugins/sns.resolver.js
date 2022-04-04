import {currentNetwork, nameRemoveSuffix, tronWebInstance} from './utils'

/* Utils */
let SNSResolver

export const contractAddress = {
  shasta: {
    registry: 'TSqM5v2fZGbsqUGb91PTYBBN3jrtCQ1p97'
  },
  nile: {
    registry: 'TC3j61vjisYEx6DmmjZ4ey9Sqqs1juj4x8'
  }
}

export async function setup() {
  // TODO: obtain current network,auto switch
  if (currentNetwork() == 'nile') {
    SNSResolver = await tronWebInstance().contract().at(contractAddress.nile.registry);
  } else if (currentNetwork() == 'shasta') {
    SNSResolver = await tronWebInstance().contract().at(contractAddress.shasta.registry);
  }
  return SNSResolver;
}

/* Get the raw Ethers contract object */
export function getSNSResolverContractInstance() {
  return SNSResolver
}

/* Main methods */


//exp: 0+1-2-3-4-5-6-7-8-9-10-11-12-13-14
//0:ethAddress ~ 14:orgTelegram
//use "+" gap
export async function setAllProperties(name, recordsStr) {
  return await SNSResolver.setAllProperties(
    nameRemoveSuffix(name),
    recordsStr
  ).send({
    feeLimit: 100_000_000,
    callValue: value,
    shouldPollResponse: true
  })
}



