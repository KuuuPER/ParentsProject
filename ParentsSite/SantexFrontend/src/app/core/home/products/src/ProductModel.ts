import { INameId } from "../../src/INameId";
import { ProductState } from "./ProductState";

export class ProductModel{
    private _status: ProductState;
    
    public constructor(
        public id: string,
        public name: string,
        public vendorCode: string,
        public category: INameId,
        public manufacture: INameId,
        public provider: INameId,
        public count: number,
        public providerPrice: number,
        public storePrice: number,
        public description?: string,
        status?: ProductState) {
            if (status !== null) {
                this._status = status;
            }
        }

    get state(): string{
        switch (this._status) {
            case ProductState.InStock:
                return 'В наличии';
            case ProductState.Awaiting:
                return 'В ожидании';
                case ProductState.Absent:
                return 'Отсутствует';
            default:
                break;
        }
    }

    set state(status: string){
        switch (status) {
            case 'В наличии':
                this._status = ProductState.InStock;
                break;
            case 'В ожидании':
                this._status = ProductState.Awaiting;
            break;
            case 'Отсутствует':
                this._status = ProductState.InStock;
                break;
            default:
                break;
        }
    }
}