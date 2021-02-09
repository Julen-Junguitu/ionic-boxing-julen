import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FighterdbserviceService } from '../core/fighterdbservice.service';
import { IFighter } from '../share/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string;
  public fighter: IFighter;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private fighterdbService: FighterdbserviceService,
    public toastController: ToastController
  ) { }
  
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.fighterdbService.getItem(this.id).then(
      (data: IFighter) => this.fighter = data
    );
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
            this.fighterdbService.remove(id);
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
