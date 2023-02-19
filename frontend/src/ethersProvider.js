import { ethers } from "ethers"
import tipJar from "/workspace/RFID-Crypto-Demo/frontend/src/artifacts/contracts/TipJar.sol/TipJar.json"

class EthersProvider {
    constructor() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        this.signer = this.provider.getSigner();
    }

    // @ts-ignore
    getContract({ address, abi }) {
        return new ethers.Contract(address, abi, this.signer);
    }

    get TipJarContract() {
        const contract = this.getContract({
            abi: tipJar.abi,
            address: tipJar.address
        });
        return {
            getCurrentOwner: async () => await contract.owner()
        }
    }

}

export default EthersProvider;