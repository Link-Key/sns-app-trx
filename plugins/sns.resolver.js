import { nameRemoveSuffix, tronWebInstance } from './utils'

/* Utils */


export const contractAddress = {
  main: {
    registry: ''
  },
  nile: {
    registry: 'TC3j61vjisYEx6DmmjZ4ey9Sqqs1juj4x8'
  }
}


export class SNSResolver {
  constructor() {
    this.SNSResolver = tronWebInstance().contract().at(contractAddress.nile.registry)
  }

  /* Get the raw Ethers contract object */
  getSNSResolverContractInstance() {
    return this.SNSResolver
  }

  /* Main methods */

  //ETH
  async getEthAddress(name) {
    return await this.SNSResolver.getEthAddress(name).call()
  }

  //BTC
  async getBtcAddress(name) {
    return await this.SNSResolver.getBtcAddress(name).call()
  }

  //LTC
  async getLtcAddress(name) {
    return await this.SNSResolver.getLtcAddress(name).call()
  }

  //DOGE
  async getDogeAddress(name) {
    return await this.SNSResolver.getDogeAddress(name).call()
  }

  //ipfs
  async getIpfs(name) {
    return await this.SNSResolver.getIpfs(name).call()
  }

  //url
  async getUrl(name) {
    return await this.SNSResolver.getUrl(name).call()
  }

  //email
  async getEmail(name) {
    return await this.SNSResolver.getEmail(name).call()
  }

  //avator
  async getAvator(name) {
    return await this.SNSResolver.getAvator(name).call()
  }

  //description
  async getDescription(name) {
    return await this.SNSResolver.getDescription(name).call()
  }

  //notice
  async getNotice(name) {
    return await this.SNSResolver.getNotice(name).call()
  }

  //keywords
  async getKeywords(name) {
    return await this.SNSResolver.getKeywords(name).call()
  }

  //comGithub
  async getComGithub(name) {
    return await this.SNSResolver.getComGithub(name).call()
  }

  //comReddit
  async getComReddit(name) {
    return await this.SNSResolver.getComReddit(name).call()
  }

  //comTwitter
  async getComTwitter(name) {
    return await this.SNSResolver.getComTwitter(name).call()
  }

  //orgTelegram
  async getOrgTelegram(name) {
    return await this.SNSResolver.getOrgTelegram(name).call()
  }

  async getAllProperties(name) {
    return await this.SNSResolver.getAllProperties(name).call()
  }

  //exp: 0+1-2-3-4-5-6-7-8-9-10-11-12-13-14
  //0:ethAddress ~ 14:orgTelegram
  //use "+" gap
  async setAllProperties(name, recordsStr) {
    return await this.SNSResolver.setAllProperties(
      nameRemoveSuffix(name),
      recordsStr
    ).send({
      feeLimit: 100_000_000,
      callValue: value,
      shouldPollResponse: true
    })
  }

  /**
   event ContentChanged(string indexed name_, string type_, string newContent);
   event OwnerChanged(string indexed name_, address newOwner);
   */
  // async getSNSResolverEvent(event, { topics, fromBlock }) {
  //   const provider = await getWeb3()
  //   const { SNSResolver } = this
  //   const ensInterface = new utils.Interface(ensContract)
  //   let Event = SNSResolver.filters[event]()
  //
  //   const filter = {
  //     fromBlock,
  //     toBlock: 'latest',
  //     address: Event.address,
  //     topics: [...Event.topics, ...topics]
  //   }
  //
  //   const logs = await provider.getLogs(filter)
  //
  //   const parsed = logs.map(log => {
  //     const parsedLog = ensInterface.parseLog(log)
  //     return parsedLog
  //   })
  //
  //   return parsed
  // }
}

// export async function setupSNSResolver({ provider, networkId, sns, name }) {
//   // const snsName = await sns.getSNSName(getAccount())
//   if (name) {
//     const resolverAddress = await sns.getResolverAddress(name)
//     return new SNSResolver({ networkId, resolverAddress, provider })
//   }
//   return {}
// }
