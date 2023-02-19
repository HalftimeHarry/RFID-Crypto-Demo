import { ethers } from "ethers"
import tip from "/workspace/RFID-Crypto-Demo/frontend/src/artifacts/contracts/TipJar.sol/TipJar.json"

class SignersProvider {
    constructor() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        this.signer = this.provider.getSigner();
    }

    // @ts-ignore
    getContract({ address, abi }) {
        return new ethers.Contract(address, abi, this.signer);
    }

    get dulliganMangerContract() {
        const contract = this.getContract({
            abi: tip.abi,
            address: tip.address
        });
        return {
            getDulliger: async () => await contract.dulliger(),
            getDulligie: async () => await contract.dulligie(),
            getVendor: async () => await contract.vendor()
        }
    }
}

export default SignersProvider;