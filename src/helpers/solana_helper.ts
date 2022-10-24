import { BehaviorSubject } from "rxjs";
import gif_project from "../idls/gif_project.json";
import { GifProject } from "../idls/gif_project";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import kp from "../keypair.json";

export interface Web3Object {
  connected: boolean;
  solanaWallet: any;
}

export class SolanaHelper {
  private static _instance: SolanaHelper;

  private _solana: any;
  private _provider: any;
  private _solanaWallet: any;
  private _systemProgram: any;
  private _baseAccount: any;
  private _programID: any;
  private _network: any;
  private _opts: any;
  private _program: any;

  public web3Objects = new BehaviorSubject<Web3Object>({
    connected: false,
    solanaWallet: undefined,
  });

  private constructor() {
    this._systemProgram = web3.SystemProgram;
    this._baseAccount = this.getBaseAccount();
    this._programID = new PublicKey(gif_project.metadata.address);
    this._network = clusterApiUrl("devnet");
    this._opts = {
      preflightCommitment: "processed",
    };
  }

  public async init(solana: any) {
    this._solana = solana;
    const connection = new Connection(
      this._network,
      this._opts.preflightCommitment
    );
    this._provider = new AnchorProvider(
      connection,
      solana,
      this._opts.preflightCommitment
    );

    this._solanaWallet = await solana.connect();
    this.web3Objects.next({
      connected: true,
      solanaWallet: this._solanaWallet,
    });
    this._program = this.getProgram();
  }

  public static get Instance() {
    return this._instance || (this._instance = new SolanaHelper());
  }

  // public async createGifAccount() {
  //   await this._program.methods
  //     .initialize()
  //     .accounts({
  //       baseAccount: this._baseAccount.publicKey,
  //       user: this._provider.wallet.publicKey,
  //       systemProgram: this._systemProgram.programId,
  //     })
  //     .signers([this._baseAccount])
  //     .rpc();
  //   console.log(
  //     "BaseAccount criado com sucesso com o endereço :",
  //     this._baseAccount.publicKey.toString()
  //   );
  // }

  public async addGif(url: string) {
    await this._program.methods
      .addGif(url)
      .accounts({
        baseAccount: this._baseAccount.publicKey,
        user: this._provider.wallet.publicKey,
      })
      .rpc();
    console.log("GIF enviado com sucesso para o programa", url);
  }

  public async voteGif(index: number) {
    await this._program.methods
      .voteGif(index)
      .accounts({
        baseAccount: this._baseAccount.publicKey,
      })
      .rpc();
  }

  public async getGifList() {
    return await this._program.account.baseAccount.fetch(
      this._baseAccount.publicKey
    );
  }

  public get GetProvider() {
    if (this._solana) {
      return this._provider;
    } else {
      throw "Init not called yet!";
    }
  }

  public get SolanaWallet() {
    if (this._solana) {
      return this._solanaWallet;
    } else {
      throw "Init not called yet!";
    }
  }

  private getBaseAccount(): any {
    const arr = Object.values(kp._keypair.secretKey);
    const secret = new Uint8Array(arr);
    return web3.Keypair.fromSecretKey(secret);
  }

  private getProgram(): any {
    return new Program<GifProject>(
      gif_project as any,
      this._programID,
      this._provider
    );
  }
}
