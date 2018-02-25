import { ProviderModel } from "../../providers/src/ProviderModel";
import { ProductModel } from "../../products/src/ProductModel";
import { ImportStatus } from "./ImportStatus";

export class ImportModel{
    private ImportStatus: ImportStatus;

    constructor(
        public id: string,
        public provider: ProviderModel,
        public products: ProductModel[],
        public createdDate: Date,
        public importDate: Date,
        public finishDate: Date = null,
        status?: ImportStatus) {
            if (status !== null) {
                this.ImportStatus = status;
            }
        }    

    get status(): string{
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

    set status(status: string){
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
}