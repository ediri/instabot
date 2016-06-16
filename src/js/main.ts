//import $ from 'github:components/jquery@2.2.4';
//import bootstrap from 'twbs/bootstrap';
import 'twbs/bootstrap/css/bootstrap.css!';
import 'reflect-metadata';
import 'zone.js';
import { bootstrap } from 'angular2/platform/browser';
import { Component } from 'angular2/core';

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div class="form-group">
      <label>name: </label>
      <input  class="form-control" [(ngModel)]="hero.name" placeholder="name">
    </div>
    `
})
export class MainComponent {
  title = 'Tour of Heroesdsd';
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}

bootstrap(MainComponent);
