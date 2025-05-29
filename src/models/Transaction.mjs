export default class Transaction {
    constructor({ id, amount, sender, receiver }) {
      this.id = id;
      this.amount = amount;
      this.sender = sender;
      this.receiver = receiver;
      this.timestamp = Date.now();
    }

  }