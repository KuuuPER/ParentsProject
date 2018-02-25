import { ProductModel } from '../../products/src/ProductModel'
import { INameId } from '../../src/INameId';

export enum DeliveryStatus{
    New = 0,
    InProgress = 1,
    Delivered = 2,
    Canceled = 3
}

export class DeliveryModel{
    private DeliveryStatus: DeliveryStatus = DeliveryStatus.New;

    public constructor(
        public Id: string,
        public Address: string,
        public ProductsCount: number,
        public deliveryDate: Date,
        public Driver: INameId,
        Status?: DeliveryStatus) {
            if (Status !== null) {
                this.DeliveryStatus = Status;
            }
        }

    get Status(): string{
        switch (this.DeliveryStatus) {
            case DeliveryStatus.New:
                return 'Новый';
            case DeliveryStatus.InProgress:
                return 'Доставляется';
            case DeliveryStatus.Delivered:
                return 'Доставлен';
            case DeliveryStatus.Canceled:
                return 'Отменён';
            default:
                break;
        }
    }

    set Status(status: string){
        switch (status) {
            case 'Новый':
                this.DeliveryStatus = DeliveryStatus.New;
            break;
            case 'Доставляется':
                this.DeliveryStatus = DeliveryStatus.InProgress;
            break;
            case 'Доставлен':
                this.DeliveryStatus = DeliveryStatus.Delivered;
            case 'Отменён':
                this.DeliveryStatus = DeliveryStatus.Canceled;
            break;
            default:
                break;
        }
    }
}