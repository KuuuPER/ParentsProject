import { INameId } from "../../src/INameId";

export enum ReturnReason{
    Defect = 0,
    Other = 1
}

export class ReturnReasonHelper{
    public static getReturnReasonText(reason: ReturnReason): string{
        switch (reason) {
            case ReturnReason.Defect:
                return 'Брак';                
            case ReturnReason.Other:
                return 'Другое';
            default:
                break;
        }
    }

    public static getReturnReasonFromText(reasonStr: string): ReturnReason{
        switch (reasonStr) {
            case 'Брак':
                return ReturnReason.Defect;                
            case 'Другое':
                return ReturnReason.Other;
            default:
                break;
        }
    }

    static reasons = [
        {key: '0', value: 'Брак'},
        {key: '1', value: 'Другое'},
      ]
    
    public static getReasonsNameId(): INameId[]{
        return this.reasons.map(r => <INameId>{ id: r.key, name: r.value });
    }

    public static getReasonNameId(reasonStr: string){
        let r = this.reasons.find(r => r.value === reasonStr);
        return {id: r.key, name: r.value};
    }
}