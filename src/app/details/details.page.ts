import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FighterdbserviceService } from '../core/fighterdbservice.service';
import { IFighter } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
import { FightercrudService } from '../core/fightercrud.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string;

  fighter: any;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private fightercrudService: FightercrudService,
    public toastController: ToastController
  ) { }
  
  ngOnInit() {
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
        }
      });

      console.log(this.fighter);
    });
  }

  editRecord(fighter) {
    this.router.navigate(['edit', fighter.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Eliminar luchador',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.fightercrudService.delete_Fighter(id);
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
