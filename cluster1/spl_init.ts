import { Keypair, Connection, Commitment } from "@solana/web3.js";
import * as bs58 from "bs58";
import { createMint } from '@solana/spl-token';
import { PRIVATE_KEY } from "./wba-wallet.json"

// Import our keypair from the wallet file
const privatekey = new Uint8Array(PRIVATE_KEY);
const keypair = Keypair.fromSecretKey(privatekey);

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Start here
        // const mint = ???
        const mint = await createMint(
            connection,
            keypair,
            keypair.publicKey,
            null,
            6
        )
        console.log(`The unique identifier of the token is: ${mint.toBase58()}`);
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
