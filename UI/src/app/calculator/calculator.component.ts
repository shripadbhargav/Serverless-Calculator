import { Component, OnInit } from '@angular/core';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { CalculatorService } from "../Services/SignalR/calculator.service";
import { SignalRService } from "../Services/SignalR/signalr.service";
import { IResult } from '../shared/interfaces/iresult';
import { IRequest } from "../shared/interfaces/request";
import { RequestDto } from '../shared/request-dto';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  firstOperand:any = null;
  lastOperationResult:any = null;
  operator:any = null;
  waitForSecondNumber:any = false;

  constructor(private calculatorService: CalculatorService,private signalRService: SignalRService) 
  { 
    this.signalRService.messages.subscribe((message) => {
      console.log("Calculator Component Event Received",message);
      //const calculationResult = JSON.parse<IResult>(message);
      this.currentNumber = message.OpResult;
      this.lastOperationResult=message.OpResult;
      this.firstOperand = null;
      this.waitForSecondNumber = true;
    });
  }

  ngOnInit() {
  }

  public getNumber(v: string){
    console.log("getNumber = " + v);
    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;

    }
  }

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }

  private doCalculation(op:any , secondOp:any)
  {
    let requestDto:IRequest = 
    {
operand1:this.firstOperand,
operand2:secondOp,
operation:op
    };

    console.log("doCalculation called-"+JSON.stringify(requestDto));
  this.calculatorService.DoCalculation(requestDto);
    }
  
  public getOperation(op: string){
    console.log("getOperation called"+op);

    if(this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);

    }else if(this.operator){
      this.doCalculation(this.operator , Number(this.currentNumber));      
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
 
  }

  public clear(){
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
}
