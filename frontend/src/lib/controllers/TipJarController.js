import { ethers } from 'ethers';
import EthersProvider from "/workspace/RFID-Crypto-Demo/frontend/src/ethersProvider.js";
import { writable, get } from "svelte/store";

const baseState = {
  owner: "",
  tips: []
};

const tipFormatter = (tips = []) => {
  return tips.map((tip, index) => {
    const [address, message, name, date, amount] = tip;
    const createdDate = new Date(date.toNumber() * 1000).toLocaleString();
    return { address, message, name, createdDate, id: index, amount };
  }).reverse();
};

class TipJarController {
  #tipJarStore = writable({ ...baseState });

  constructor() {
    this.tip_store = {
      subscribe: this.#tipJarStore.subscribe
    };
    this.updateForm = writable("");
    this.createTip = writable({});
  }

  async init() {
    this.ethersProvider = new EthersProvider();
    await this.#getOwner();
    await this.#getAllTips();
  }

  async sendTip() {
    const message = "Thanks for participating in our demo";
    const name = "Albatross Demo";
    const amount = 0.001;
    try {
      const tx = await this.ethersProvider?.TipJarContract.sendTip(
        message, name, amount
      );
      console.log(tx);
      const response = await tx.wait();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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

  async #getOwner() {
    const owner = await this.ethersProvider?.TipJarContract.getCurrentOwner();
    this.#tipJarStore.update(s => ({ ...s, owner }));
  }

  async #getAllTips() {
    const tips = await this.ethersProvider?.TipJarContract.getAllTips();
    const formattedTips = tipFormatter(tips);
    this.#tipJarStore.update(s => ({ ...s, tips: formattedTips }));
  }

  async getCurrentUser() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  }

  async withdraw() {
    try {
      const tx = await this.ethersProvider?.TipJarContract.witdraw()
      console.log(tx);
      const response = await tx.wait();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new TipJarController();
