import { ProductModel } from "../../products/src/ProductModel";
import { DeliveryModel } from "../../deliveries/src/DeliveryModel";
import { ContactModel } from "./ContactModel";

export class PurchaseModel{
    constructor(public id: string, public contact: ContactModel, public date: Date, public products: ProductModel[], public delivery: DeliveryModel){}
}