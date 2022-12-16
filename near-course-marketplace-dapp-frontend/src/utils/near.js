import { connect, Contract, keyStores, WalletConnection } from "near-api-js"; 
import environment from "./config";

const nearEnvironment = environment("testnet");

export async function connectToContract() {

    const near = await connect(
            Object.assign(
                {
                    deps: {
                        keyStore: new keyStores.BrowserLocalStorageKeyStore() 
                    }
                },
                nearEnvironment
            ) 
    )  
 
    window.walletConnection = new WalletConnection(near);
  
    window.accountId = window.walletConnection.getAccountId();
  
    window.contract = new Contract(
        window.walletConnection.account(),
        nearEnvironment.contractName,
        {
            viewMethods: ["getCourse"],
            changeMethods: ["addCourse"]
        }
    );

    console.log(window.contract);
} 

export default connectToContract;