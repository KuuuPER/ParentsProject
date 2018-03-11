import { INameId } from "../../src/INameId";
import { ReturnReason, ReturnReasonHelper } from "./ReturnReason";
import { ReturnPurchaseUnitModel } from "./ReturnPurchaseUnitModel";

export class ReturnPurchaseModel{
    constructor(
        public id: string,
        public purchase: INameId,
        public units: ReturnPurchaseUnitModel[],
        public comment: string,
        public date: Date,
        public reason: ReturnReason
    ){}

    public getReasonStr(): string{
        return ReturnReasonHelper.getReturnReasonText(this.reason);
    }

    public setReasonByStr(reasonStr: string){
        this.reason = ReturnReasonHelper.getReturnReasonFromText(reasonStr);
    }

    public getReasonNameId(): INameId{
        return {id: '0', name: this.getReasonStr()};
    }
}