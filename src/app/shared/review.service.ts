import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Review } from '../interface/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private afs:AngularFirestore) { }

  // Review
  //add review
  CREATE_review(review:Review) {
    review.id = this.afs.createId();
    return this.afs.collection('/Review').add(review);
  }
  //get all review
  READ_review() {
    return this.afs.collection('/Review').snapshotChanges();
  }
  //delete review
  DELETE_review(review:Review) {
    return this.afs.doc('/Review/'+review.id).delete();
  }
  //update review
  UPDATE_review(review:Review) {
    return this.afs.doc('/Review/' + review.id).update(review);
  }
}
