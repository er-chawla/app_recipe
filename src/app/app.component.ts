import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  navValue = 'recipe';
  title = 'app works!';

  ngOnInit() {
    const config = {
      apiKey: 'AIzaSyCJyBs6WxNoDi0nldsrf3vZw5nm_tzP5hA',
      authDomain: 'app-my-recipe.firebaseapp.com',
    };
    firebase.initializeApp(config);
  }

  changeNavigation(feature: string ) {
    this.navValue = feature;
  }
}
