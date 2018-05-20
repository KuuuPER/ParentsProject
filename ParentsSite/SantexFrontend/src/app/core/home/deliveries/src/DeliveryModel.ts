import { ProductModel } from '../../products/src/ProductModel'
import { INameId } from '../../src/INameId';
import { DeliveryStatus } from './DeliveryStatus';
import { DeliveryPurchaseModel } from './DeliveryPurchaseModel';

export class DeliveryModel{
    public DeliveryStatus: DeliveryStatus = DeliveryStatus.Planned;

    public constructor(
        public id: string,        
        public deliveryDate: Date,
        public driver: INameId,
        public purchases: DeliveryPurchaseModel[],
        status?: DeliveryStatus,
        public finishDate?: Date) {
            if (status !== null) {
                this.DeliveryStatus = status;
            }
        }

    get status(): string{
        switch (this.DeliveryStatus) {
            case DeliveryStatus.Planned:
                return 'Запланировано';
            case DeliveryStatus.NotDelivered:
                return 'Не доставлен';
            case DeliveryStatus.InDelivery:
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
                this.DeliveryStatus = DeliveryStatus.Planned;
            break;
            case 'Не доставлен':
                this.DeliveryStatus = DeliveryStatus.NotDelivered;
            case 'Доставляется':
                this.DeliveryStatus = DeliveryStatus.InDelivery;
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