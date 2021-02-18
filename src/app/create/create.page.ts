import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { FighterdbserviceService } from '../core/fighterdbservice.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IFighter } from '../share/interfaces';
import { FightercrudService } from '../core/fightercrud.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  id: string;
  fighter: any;
  fighterForm: FormGroup;
  constructor(
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
      image: new FormControl(''),
    });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar luchador',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.fighter = this.fighterForm.value;
            this.fightercrudService.create_Fighter(this.fighter);
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

  saveFighter() {
    this.fighter = this.fighterForm.value;
    let nextKey = this.id;
    let num = Number.parseInt(nextKey);
    let numId = num+1
    this.fighter.id = numId.toString();
    this.fightercrudService.setItem(this.fighter.id, this.fighter );
    console.warn(this.fighterForm.value);
    }
}
