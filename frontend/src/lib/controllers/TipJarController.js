import EthersProvider from "/workspace/RFID-Crypto-Demo/frontend/src/ethersProvider.js";
import { writable } from "svelte/store";


const baseState={
  owner: "loading owner..."
}

class TipJarController{
  #tipJarStore=writable({...baseState})
  
  constructor() {
    this.tip_store={
      subscribe:this.#tipJarStore.subscribe
    }
  }

  async init() {
    this.ethersProvider = new EthersProvider();
    this.#getOwner();
  }
  
  async #getOwner(){
    const owner = await this.ethersProvider?.TipJarContract.getCurrentOwner();
    this.#tipJarStore.update(s => ({...s, owner }))
  }

  async setNewOwner(newOwnerAddress) {
  console.log('newOwnerAddress:', newOwnerAddress);
    await this.ethersProvider?.TipJarContract.setNewOwner(newOwnerAddress);
    console.log(this.ethersProvider);
    
}

}

export default new TipJarController();
