import { Component, OnInit } from '@angular/core';
import { IFighter } from '../share/interfaces';
import { FighterdbserviceService } from '../core/fighterdbservice.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public fighters: IFighter[];
  fightersinit: IFighter[] = [
    {
      id: '1',
      name: 'Gennady Golovkin',
      record: '41-1-1',
      yearOfBirth: '1982-01-04',
      country: 'Kazajistan',
      image:
        'https://i.pinimg.com/originals/42/59/65/4259658d2772dd0c90b72534708db25b.jpg'
      
    },
    {
      id: '2',
      name: 'Josh Taylor',
      record: '19-0-0',
      yearOfBirth: '1991-06-03',
      country: 'Inglaterra',
      image:
        'https://www.thesun.co.uk/wp-content/uploads/2019/10/NINTCHDBPICT000491028855-e1571513096626.jpg'
    }
  ]

  constructor(private fighterdbService: FighterdbserviceService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.fighters !== undefined) {
      this.fighters.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.fighterdbService.empty()) {
      this.fightersinit.forEach(fighter => {
        this.fighterdbService.setItem(fighter.id, fighter);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.fighterdbService.getAll().then(
      (data) => this.fighters = data
    );
  }
  fighterTapped(fighter) {
    this.route.navigate(['/details', fighter.id]);
  }
}
