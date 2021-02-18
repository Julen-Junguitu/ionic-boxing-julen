import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FighterdbserviceService } from '../core/fighterdbservice.service';
import { IFighter } from '../share/interfaces';
import { FightercrudService } from '../core/fightercrud.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  fighter: any;
  fighterForm: FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private fightercrudService: FightercrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {

    this.fighterForm = new FormGroup({
      name: new FormControl(''),
      record: new FormControl(''),
      yearOfBirth: new FormControl(''),
      country: new FormControl(''),
      image: new FormControl('')
    });


    this.id = this.activatedrouter.snapshot.params.id;
    this.fightercrudService.read_Fighters().subscribe(data => {
      let fighters = data.map(e => {


        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          record: e.payload.doc.data()['record'],
          yearOfBirth: e.payload.doc.data()['yearOfBirth'],
          country: e.payload.doc.data()['country'],
          image: e.payload.doc.data()['image']
        };
      })

      fighters.forEach(element => {
        if(element.id == this.id){
          this.fighter = element;
          this.fighterForm.get('name').setValue(this.fighter.name),
          this.fighterForm.get('record').setValue(this.fighter.record),
          this.fighterForm.get('yearOfBirth').setValue(this.fighter.yearOfBirth),
          this.fighterForm.get('country').setValue(this.fighter.country),
          this.fighterForm.get('image').setValue(this.fighter.image)
        }
      });

      console.log(this.fighter);
    });
  }
  async onSubmit(){
    const toast = await this.toastController.create({
      header: 'Editar luchador',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.fighter.name = this.fighterForm.get('name').value,
            this.fighter.record = this.fighterForm.get('record').value,
            this.fighter.yearOfBirth = this.fighterForm.get('yearOfBirth').value,
            this.fighter.country = this.fighterForm.get('country').value,
            this.fighter.image = this.fighterForm.get('image').value,
            this.fightercrudService.update_Fighter(this.id, this.fighter);
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
 

}