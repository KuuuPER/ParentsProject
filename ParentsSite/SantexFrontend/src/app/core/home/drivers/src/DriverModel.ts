import { DeliveryModel } from "../../deliveries/src/DeliveryModel";
import { DriverDeliveryModel } from "./DriverDeliveryModel";

export class DriverModel{
    constructor(
        public id: string,
        public name: string,
        public rate: number,
        public notes: string,
        public deliveries: DriverDeliveryModel[]) {
            if (!deliveries) {
                deliveries = new Array<DriverDeliveryModel>();
            }
        }
}