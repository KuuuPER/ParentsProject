import { INameId } from '../../src/INameId'

export class ProviderModel implements INameId{
    constructor(
        public Name: string,
        public Id: string
    ){}
}