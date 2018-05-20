import { ContactModel } from "../../purchases/src/ContactModel";
import { PurchaseUnitModel } from "../../src/PurchaseUnit";

export class DeliveryPurchaseModel{
    constructor(
        public id: string,
        public address: string,
        public timeFrom: number,
        public timeTo: number,
        public notes: string,
        public contacts: ContactModel[],
        public purchaseUnits: PurchaseUnitModel[]
    ) { }
}