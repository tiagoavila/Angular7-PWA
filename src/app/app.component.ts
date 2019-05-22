import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pwa-example';
  joke: any;
  offline: boolean;

  constructor(private swUpdate: SwUpdate, private data: DataService) {

  }

  onNetworkStatusChange() {
    this.offline = !navigator.onLine;
    console.log('offline ' + this.offline);
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("New Version Available. Load New Version?")) {
          window.location.reload();
        }
      });
    }

    this.data.giveMeJokes().subscribe(res => {
      this.joke = res;
    });

    window.addEventListener('online',  this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
  }
}
