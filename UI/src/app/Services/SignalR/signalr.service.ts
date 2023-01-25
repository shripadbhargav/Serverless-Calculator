import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HubConnection } from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";
import { Observable, of } from "rxjs";
import { SignalRConnectionInfo } from "./signalr-connection-info.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { IResult } from "src/app/shared/interfaces/iresult";

@Injectable()
export class SignalRService {
  private readonly _http: HttpClient;

  private readonly _baseUrl: string = environment.azureConnection;
  private hubConnection: HubConnection;
  messages: Subject<IResult> = new Subject();

  constructor(http: HttpClient) {
    this._http = http;
  }

  private getConnectionInfo(): Observable<SignalRConnectionInfo> {
    let requestUrl = `${this._baseUrl}negotiate`;
    return this._http.get<SignalRConnectionInfo>(requestUrl);
  }

  init() {
    this.getConnectionInfo().subscribe((info) => {
      let options = {
        accessTokenFactory: () => info.accessToken,
      };

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(info.url, options)
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.hubConnection.start().catch((err) => console.error(err.toString()));

      this.hubConnection.on("resultAvailable", (data: IResult) => {
        console.log("Callback func is called with data",data);
        this.messages.next(data);
      });
    });
  }

}
