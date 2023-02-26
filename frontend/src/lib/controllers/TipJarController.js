// @ts-nocheck
import EthersProvider from "/workspace/RFID-Crypto-Demo/frontend/src/ethersProvider.js";
import { writable,get } from "svelte/store";

const baseState={
  owner: "loading owner..."
}


class TipJarController{
  #tipJarStore=writable({...baseState})
  
  constructor() {
    this.tip_store={
      subscribe:this.#tipJarStore.subscribe
    }

    this.updateForm=writable('')

  }

  async init() {
    this.ethersProvider = new EthersProvider();
    this.#getOwner();
  }

  async setNewOwner(newAddress) {
      try {
        const tx = await this.ethersProvider?.TipJarContract.setNewOwner(newAddress);
        console.log(tx);
        const response = await tx.wait();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    
  async #getOwner(){
    const owner = await this.ethersProvider?.TipJarContract.getCurrentOwner();
    this.#tipJarStore.update(s => ({...s, owner }))
  }
}

export default new TipJarController();
