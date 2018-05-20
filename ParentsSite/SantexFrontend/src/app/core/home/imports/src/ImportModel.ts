import { ProviderModel } from "../../providers/src/ProviderModel";
import { ProductModel } from "../../products/src/ProductModel";
import { ImportStatus } from "./ImportStatus";
import { INameId } from "../../src/INameId";
import { ImportProductModel } from "./ImportProductModel";

export class ImportModel{
    private ImportStatus: ImportStatus;

    constructor(
        public id: string,
        public provider: INameId,
        public products: ImportProductModel[],
        public createdDate: Date,
        public importDate: Date,
        public finishDate: Date = null,
        public status?: ImportStatus) {
            if (status !== null) {
                this.ImportStatus = status;
            }
        }    

    get statusStr(): string{
        switch (this.ImportStatus) {
            case ImportStatus.New:
                return 'Новый';
            case ImportStatus.InProgress:
                return 'Доставляется';
            case ImportStatus.Imported:
                return 'Доставлено';
            case ImportStatus.Canceled:
                return 'Отменено';
            default:
                break;
        }
    }

    set statusStr(status: string){
        switch (status) {
            case 'Новый':
                this.ImportStatus = ImportStatus.New;
            break;
            case 'Доставляется':
                this.ImportStatus = ImportStatus.InProgress;
            break;
            case 'Доставлено':
                this.ImportStatus = ImportStatus.Imported;
            case 'Отменено':
                this.ImportStatus = ImportStatus.Canceled;
            break;
            default:
                break;
        }
    }

    public productsCount(): number{
        let count = 0;
        this.products.forEach(p => count += p.count);

        return count;
    }
}