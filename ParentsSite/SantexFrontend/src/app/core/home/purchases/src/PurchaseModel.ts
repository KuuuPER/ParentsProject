import { ProductModel } from "../../products/src/ProductModel";
import { DeliveryModel } from "../../deliveries/src/DeliveryModel";
import { ContactModel } from "./ContactModel";
import { PurchaseUnitModel } from "../../src/PurchaseUnit";
import { PurchaseDeliveryModel } from "./PurchaseDeliveryModel";

export class PurchaseModel{
    constructor(public id: string, public date: Date, public purchaseUnits: PurchaseUnitModel[], public deliveries: PurchaseDeliveryModel[]) { }
}