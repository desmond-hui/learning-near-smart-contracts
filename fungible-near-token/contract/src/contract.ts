import { NearBindgen, near, call, view, LookupMap, initialize, assert} from 'near-sdk-js';

@NearBindgen({})
class FungibleToken {
  accounts: LookupMap;
  totalSupply: number;

  constructor() {
    this.accounts = new LookupMap("n");
    this.totalSupply = 0;
  }

  @initialize({})
  init({prefix, totalSupply}) {
    this.accounts = new LookupMap(prefix);
    this.totalSupply = totalSupply;
    this.accounts.set(near.signerAccountId(), this.totalSupply);
  }

  @view({})
  getTotalSupply() {
    return this.totalSupply;
  }

  @view({})
  getBalance({accountId}){
    return this.accounts.get(accountId) || 0;
  }

  internalWithdraw({senderId, amount}){
    let balanceOfSender = 0;
    if (this.accounts.get(senderId)) {
      balanceOfSender = this.accounts.get(senderId) as number;
    }

    // This is the new balance after the withdrawal
    let newBalanceAfterWithdrawal = balanceOfSender - amount;

    assert(newBalanceAfterWithdrawal >= 0, "The account does not have enough funds.");

    // Set the balance for the new balance
    this.accounts.set(senderId, newBalanceAfterWithdrawal);

    // This is equivalent to the new supply after withdrawal
    let newSupplyAfterWithdrawal = this.totalSupply - amount; 

    assert(newSupplyAfterWithdrawal >= 0, "Total supply overflow");

    this.totalSupply = newSupplyAfterWithdrawal;
  
  }

  internalDeposit({receiverId, amount}) {
    let balanceOfReceiver = 0;
    if (this.accounts.get(receiverId)) {
      balanceOfReceiver = this.accounts.get(receiverId) as number;
    }

    let newBalanceAfterDeposit = balanceOfReceiver + amount;
    this.accounts.set(receiverId, newBalanceAfterDeposit);

    this.totalSupply = this.totalSupply + amount; 
  }

  internalTransfer({senderId, receiverId, amountOfTokens}) {
    assert(senderId != receiverId, "Sender and receiver cannot be the same");
    assert(amountOfTokens > 0, "Amount of tokens need to be greater than 0");

    // This withdraws money from the sender's account
    this.internalWithdraw({senderId, amount: amountOfTokens});
    this.internalDeposit({receiverId, amount: amountOfTokens});
  }

  @call({})
  transferTokens({receiverId, amountOfTokens}) {
   let senderId = near.predecessorAccountId();
   this.internalTransfer({senderId, receiverId, amountOfTokens});
  }
}