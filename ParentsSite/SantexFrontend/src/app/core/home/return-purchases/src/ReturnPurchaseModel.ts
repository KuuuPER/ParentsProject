import { INameId } from "../../src/INameId";
import { PurchaseUnitModel } from "../../src/PurchaseUnit";
import { ReturnReason } from "./ReturnReason";

export class ReturnPurchaseModel{
    private returnReason: ReturnReason;

    constructor(
        public id: string,
        public purchase: INameId,
        public purchaseUnits: PurchaseUnitModel[],
        public comment: string,
        reason?: ReturnReason
    ){
        if (reason !== null) {
            this.returnReason = reason;
        }
    }

    get reason(): string{
        switch (this.returnReason) {
            case ReturnReason.Defect:
                return 'Брак';                
            case ReturnReason.Other:
                return 'Другое';
            default:
                break;
        }
    }

    set reason(reason: string){
        switch (reason) {
            case 'Брак':
                this.returnReason = ReturnReason.Defect;
            break;
            case 'Другое':
                this.returnReason = ReturnReason.Other;
            break;
            default:
                break;
        }
    }
}