import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FightercrudService } from './../core/fightercrud.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  fighters: any;
 
  constructor(private fightercrudService: FightercrudService, private route: Router) { }
  ngOnInit() {
    this.fightercrudService.read_Fighters().subscribe(data => {
      this.fighters = data.map(e => {
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
      console.log(this.fighters);
    });
  }


  

  fighterTapped(fighter) {
    this.route.navigate(['/details', fighter.id]);
  }
}