import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Transaction } from '../interface/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private afs:AngularFirestore) { }

  // Expense
  //add expense
  CREATE_expense(expense:Transaction) {
    expense.id = this.afs.createId();
    return this.afs.collection('/Expense').add(expense);
  }
  //get all expenses
  READ_expense() {
    return this.afs.collection('/Expense').snapshotChanges();
  }
  //delete expense
  DELETE_expense(expense:Transaction) {
    return this.afs.doc('/Expense/'+expense.id).delete();
  }
  //update expense
  UPDATE_expense(expense:Transaction) {
    return this.afs.doc('/Expense/' + expense.id).update(expense);
  }

  // Income
  //add income
  CREATE_income(income:Transaction) {
    income.id = this.afs.createId();
    return this.afs.collection('/Income').add(income);
  }
  //get all income
  READ_income() {
    return this.afs.collection('/Income').snapshotChanges();
  }
  //delete income
  DELETE_income(income:Transaction) {
    return this.afs.doc('/Income/'+income.id).delete();
  }
  //update income
  UPDATE_income(income:Transaction) {
    return this.afs.doc('/Income/' + income.id).update(income);
  }  
}
