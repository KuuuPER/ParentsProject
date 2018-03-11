import { DeliveryModel } from "../../deliveries/src/DeliveryModel";

export class DriverModel{
    constructor(
        public id: string,
        public name: string,
        public rate: number,
        public notes: string,
        public deliveries: DeliveryModel[]){}
}