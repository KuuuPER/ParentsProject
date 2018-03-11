import { ProductModel } from "../../products/src/ProductModel";
import { DeliveryModel } from "../../deliveries/src/DeliveryModel";
import {INameId} from '../../src/INameId';
import { ContactModel } from "./ContactModel";
import { PurchaseUnitModel } from "../../src/PurchaseUnit";

export class PurchaseModel implements INameId{
    constructor(public id: string, public contact: ContactModel, public date: Date, public units: PurchaseUnitModel[], public delivery: DeliveryModel){}

    get name() :string{
        return this.contact.name + ' ' + this.date.getDate() + '-' + this.date.getMonth() + 1 + '-' + this.date.getFullYear();
    }
}