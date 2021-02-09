import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FighterdbserviceService } from '../core/fighterdbservice.service';
import { IFighter } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  fighter: IFighter;
  fighterForm: FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private fighterdbService: FighterdbserviceService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.fighterdbService.getItem(this.id).then(
      (data: IFighter) => {
        
        this.fighter = data;
        this.fighterForm.get('name').setValue(this.fighter.name),
        this.fighterForm.get('record').setValue(this.fighter.record),
        this.fighterForm.get('yearOfBirth').setValue(this.fighter.yearOfBirth),
        this.fighterForm.get('country').setValue(this.fighter.country),
        this.fighterForm.get('image').setValue(this.fighter.image)
      })

    this.fighterForm = new FormGroup({
      name: new FormControl(''),
      record: new FormControl(''),
      yearOfBirth: new FormControl(''),
      country: new FormControl(''),
      image: new FormControl('')
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
            this.updateFighter();
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
  updateFighter() {
    this.fighter = this.fighterForm.value;
    let id = this.id;
    this.fighterdbService.remove(this.id);
    this.fighter.id = id;
    this.fighterdbService.setItem(this.fighter.id, this.fighter);
  }

}