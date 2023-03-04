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
            address: tipJar.address,
        });

        return {
            getCurrentOwner: async () => await contract.owner(),
            setNewOwner: async (newAddress) => contract.setNewOwner(newAddress),
            sendTip: async (message, name, value) => {
                if (value == null) {
                    console.log("Value is null or undefined");
                    return;
                }
                const valueInWei = ethers.utils.parseEther(value.toString());
                return await contract.sendTip(message, name, {value: valueInWei});
            },
            getAllTips: async () => await contract.getAllTips(),
            witdraw: async () => await contract.withdraw()
        }
        };
    }


export default EthersProvider;
