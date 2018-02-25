import { INameId } from "./INameId";
import { PurchaseUnitStatus } from "./PurchaseUnitStatus";

export class PurchaseUnitModel{
    private purchaseUnitStatus: PurchaseUnitStatus;

    constructor(
        public purchase: INameId,
        public product: INameId,
        public count: number,
        public storePrice: number,
        public createdDate: Date,
        public updatedDate: Date,
        status?: PurchaseUnitStatus
    ){
        if (status !== null) {
            this.purchaseUnitStatus = status;
        }
    }

    get status(): string{
        switch (this.purchaseUnitStatus) {
            case PurchaseUnitStatus.New:
                return 'Новый';
            case PurchaseUnitStatus.Buyed:
                return 'Куплено';
            case PurchaseUnitStatus.Returned:
                return 'Возвращено';
            default:
                break;
        }
    }

    set status(status: string){
        switch (status) {
            case 'Новый':
                this.purchaseUnitStatus = PurchaseUnitStatus.New;
            break;
            case 'Куплено':
                this.purchaseUnitStatus = PurchaseUnitStatus.Buyed;
            break;
            case 'Возвращено':
                this.purchaseUnitStatus = PurchaseUnitStatus.Returned;
            break;
            default:
                break;
        }
    }
}