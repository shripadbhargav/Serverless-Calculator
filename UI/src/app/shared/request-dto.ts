import { IRequest } from "./interfaces/request";

export class RequestDto implements IRequest{
    operand1!: number;
    operand2!: number;
    operation!: string;

    constructor()
    {
        
    }
}
