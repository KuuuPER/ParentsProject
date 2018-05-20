import { DeliveryStatus } from "../../deliveries/src/DeliveryStatus";

export class DriverDeliveryModel{
    constructor(
        public id: string,
        public deliveryDate: Date,
        public status: DeliveryStatus,
        public purchasesCount?: number
    ){}
}