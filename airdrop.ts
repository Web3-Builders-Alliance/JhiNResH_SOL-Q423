import * as bs58 from 'bs58';
import prompt from 'prompt-sync';
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js"


function base58ToWallet() {
    console.log("Enter your name:");
    const stdin = prompt({});
    const base58 = stdin({});
    const wallet = bs58.decode(base58);
    console.log(wallet);
}

function walletToBase58() {
    const wallet: number[] = [
        191,
        17,
        7,
        75,
        133,
        150,
        217,
        77,
        96,
        236,
        207,
        66,
        66,
        67,
        120,
        8,
        6,
        167,
        96,
        230,
        74,
        236,
        18,
        179,
        240,
        216,
        159,
        38,
        174,
        110,
        121,
        155,
        185,
        241,
        38,
        36,
        14,
        171,
        81,
        2,
        190,
        165,
        168,
        19,
        35,
        184,
        248,
        209,
        251,
        44,
        73,
        153,
        25,
        0,
        246,
        129,
        42,
        161,
        124,
        252,
        106,
        252,
        177,
        130
    ];
    const base58 = bs58.encode(Buffer.from(wallet)).toString();
    const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
    const connection = new Connection("https://api.devnet.solana.com");
    (async () => {
        try {
            // We're going to claim 2 devnet SOL tokens
            const txhash = await

                connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);

            console.log(`Success! Check out your TX here:
        https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
        } catch (e) {
            console.error(`Oops, something went wrong: ${e}`)
        }
    })();
    console.log(base58);
}

base58ToWallet();
walletToBase58();