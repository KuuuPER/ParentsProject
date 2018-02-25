import { DeliveryModel } from "../../deliveries/src/DeliveryModel";

export class DriverModel{
    constructor(
        public id: String,
        public name: String,
        public rate: number,
        public notes: String,
        public deliveries: DeliveryModel[]){}
}