import { ContactModel } from "./ContactModel";
import { INameId } from "../../src/INameId";
import { PurchaseUnitModel } from "../../src/PurchaseUnit";

export class PurchaseDeliveryModel {
    constructor(
        public contacts: ContactModel[],
        public date: Date,
        public address: string,
        public timeFrom: number,
        public timeTo: number,
        public driver: INameId,
        public purchaseUnits: PurchaseUnitModel[]
    ) { }

    get name(): string{
        return this.driver.name + ' - ' + this.date.getDay() + '' + (this.date.getMonth() + 1) + this.date.getFullYear();
    }
}