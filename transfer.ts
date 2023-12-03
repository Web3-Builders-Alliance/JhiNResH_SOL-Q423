import {
    Transaction, SystemProgram, Connection, Keypair,
    LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey
} from "@solana/web3.js";
import wallet from "./dev-wallet.json";

// Import our dev wallet keypair from the wallet file
const privateKey = new Uint8Array(wallet.PRIVATE_KEY);
const payer = Keypair.fromSecretKey(privateKey);

// Define our WBA public key
const to = new PublicKey("DWqhTJMeUU11yDT9MrrJNoSPh1rYH3g7pkeQj2pAZ3cV");

//Create a Solana devnet connection
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: payer.publicKey,
                toPubkey: to,
                lamports: LAMPORTS_PER_SOL / 100,
            })
        );
        transaction.recentBlockhash = (await

            connection.getLatestBlockhash('confirmed')).blockhash;

        transaction.feePayer = payer.publicKey;
        // Sign transaction, broadcast, and confirm
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [payer]
        );
        console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();