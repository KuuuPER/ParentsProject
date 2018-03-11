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
        public id: string,
        public address: string,
        public productsCount: number,
        public date: Date,
        public driver: INameId,
        status?: DeliveryStatus,
        public finishDate?: Date) {
            if (status !== null) {
                this.DeliveryStatus = status;
            }
        }

    get status(): string{
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

    set status(status: string){
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