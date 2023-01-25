import { Component, ɵɵsetComponentScope } from '@angular/core';
import { SignalRService } from "./Services/SignalR/signalr.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Serverless-Calculator';

  constructor(   
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {

    console.log("ngOnInit called for App Component");
    // start the service to connect to azure signalR
    this.signalRService.init();    
  }
}
