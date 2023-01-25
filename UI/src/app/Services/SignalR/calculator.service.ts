import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, observable, Observable, tap, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { IRequest } from 'src/app/shared/interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private readonly _calculatorUrl: string = environment.calculatorUrl;

  private httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(
    private http: HttpClient) { }

    
    DoCalculation(calculationInput:IRequest) 
    {
      console.log("Do calculation is called");
      return this.http.post<IRequest>(this._calculatorUrl, calculationInput, this.httpOptions).subscribe(data =>
        
        (error: any) => {
          return console.log('oops', error);
        }
      );
    }

    private handleError(err: HttpErrorResponse)
    {
        let errorMessage ='';
        console.error(err);
        return throwError(()=>errorMessage);
    }
}

