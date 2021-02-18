import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FightercrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }
  create_Fighter(record) {
    return this.firestore.collection('Fighters').add(record);
  }
  read_Fighters() {
    return this.firestore.collection('Fighters').snapshotChanges();
  }
  update_Fighter(recordID, record) {
    this.firestore.doc('Fighters/' + recordID).update(record);
  }
  delete_Fighter(record_id) {
    this.firestore.doc('Fighters/' + record_id).delete();
  }
  read_Fighter(record_id) {
    return this.firestore.doc('Fighters/' + record_id).snapshotChanges();
  }
}

