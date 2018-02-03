import { INameId } from '../../src/INameId'

export class ManufactureModel implements INameId{
    constructor(
        public Name: string,
        public Id: string
    ){}
}