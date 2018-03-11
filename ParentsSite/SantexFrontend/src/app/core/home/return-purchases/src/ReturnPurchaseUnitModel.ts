import { PurchaseUnitModel } from "../../src/PurchaseUnit";
import { INameId } from "../../src/INameId";

export class ReturnPurchaseUnitModel{
    constructor(
        public id: string,
        public product: INameId,
        public count: number 
    ){}
}