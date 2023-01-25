import { IResult } from "./interfaces/iresult";

export class CalculationResult implements IResult {
    ErrorInfo!: string;
    IsSuccess!: boolean;
    OpResult!: string;
    constructor()
    {

    }
}
