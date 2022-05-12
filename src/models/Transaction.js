import {formatCurrency, formatDateString} from '@utils/helper';

class Transaction {
  constructor(...props) {
    const {
      id,
      account_number,
      amount,
      beneficiary_bank,
      beneficiary_name,
      sender_bank,
      completed_at,
      created_at,
      fee,
      remark,
      status,
      unique_code,
    } = props;
    this.id = id;
    this.account_number = account_number;
    this.amount = amount;
    this.beneficiary_bank = beneficiary_bank;
    this.beneficiary_name = beneficiary_name;
    this.sender_bank = sender_bank;
    this.completed_at = completed_at;
    this.created_at = created_at;
    this.fee = fee;
    this.remark = remark;
    this.status = status;
    this.unique_code = unique_code;
  }

  get getFormattedAmmount() {
    if (this.amount) {
      return formatCurrency(this.amount);
    }
    return undefined;
  }

  get getFormattedCreateDate() {
    if (this.created_at) {
      return formatDateString(this.created_at);
    }
    return undefined;
  }
}

export default Transaction;
