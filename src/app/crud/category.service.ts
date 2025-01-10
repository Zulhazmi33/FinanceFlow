import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../interface/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs:AngularFirestore) { }

  //add category
  CREATE_category(category:Category) {
    category.id = this.afs.createId();
    return this.afs.collection('/Category').add(category);
  }
  //get all category
  READ_category() {
    return this.afs.collection('/Category').snapshotChanges();
  }
  //delete category
  DELETE_category(category:Category) {
    return this.afs.doc('/Category/'+category.id).delete();
  }
  //update category
  UPDATE_category(category:Category) {
    return this.afs.doc('/Category/' + category.id).update(category);
  }
}
