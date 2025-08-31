import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calculator } from "../target/types/calculator";
import { assert } from "chai";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const newAccount = anchor.web3.Keypair.generate();

  const program = anchor.workspace.calculator as Program<Calculator>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
    .initialize(10)
    .accounts({
      signer:anchor.getProvider().wallet.publicKey,
      account:newAccount.publicKey
    })
    .signers([newAccount])
    .rpc()
    console.log("Your transaction signature", tx);

    let account = await program.account.datashape.fetch(newAccount.publicKey);
    assert(account.num==10)
  });
  it("Double!", async () => {
      const tx = await program.methods.double().accounts({
        signer:anchor.getProvider().wallet.publicKey,
        account:newAccount.publicKey
      }).rpc()
      console.log("Your transaction signature", tx);
      let account = await program.account.datashape.fetch(newAccount.publicKey);
      assert(account.num==20)
    });
   it("Add!",async()=>{

    const tx = await program.methods.add(10).accounts({
      signer:anchor.getProvider().wallet.publicKey,
      account:newAccount.publicKey
    }).rpc()
    console.log("Your transaction signature", tx);
    let account = await program.account.datashape.fetch(newAccount.publicKey);
    assert(account.num==30)
 
  });
});
