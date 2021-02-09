import { Injectable } from '@angular/core';
import { IFighter } from '../share/interfaces';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FighterdbserviceService {
  auxFighter: IFighter;
  auxFighterList: IFighter[] = [];
  constructor(private storage: Storage) { }
  // Stores a value
  setItem(reference: string, value: IFighter) {
    this.storage.set(reference, {
      id: value.id, name: value.name, record:
        value.record, yearOfBirth: value.yearOfBirth, country: value.country, image:
        value.image
    })
      .then(
        (data) => console.log('Stored first item!', data),
        error => console.error('Error storing item', error)
      );
  }
  // Gets a stored item
  getItem(reference): Promise<IFighter> {
    return this.storage.get(reference);
  }
  // check if it is empty
  empty() {
    return this.storage.keys()
      .then(
        (data) => { return true },
        error => { return false }
      );
  }
  // Retrieving all keys
  keys(): Promise<string[]> {
    return this.storage.keys();
  }
  // Retrieving all values
  getAll(): Promise<IFighter[]> {
    return this.storage.keys().then((k) => {
      k.forEach(element => {
        this.getItem(element).then(
          (data: IFighter) => this.auxFighterList.push(data)
        );
      });
      return this.auxFighterList;
    });
  }
  // Removes a single stored item
  remove(reference: string) {
    this.storage.remove(reference)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
  clear() {
    this.storage.clear()
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }

  getLength(): Promise<Number>{
    return this.storage.length();
  }
} 