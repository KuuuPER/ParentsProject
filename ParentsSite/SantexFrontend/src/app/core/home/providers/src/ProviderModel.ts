import { INameId } from '../../src/INameId'
import { ContactModel } from '../../purchases/src/ContactModel';
import { ImportModel } from '../../imports/src/ImportModel';

export class ProviderModel implements INameId{
    constructor(
        public name: string,
        public id: string,
        public contacts: ContactModel[],
        public imports: ImportModel[],
    ){}
}