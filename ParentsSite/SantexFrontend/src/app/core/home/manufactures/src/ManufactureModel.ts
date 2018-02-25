import { INameId } from '../../src/INameId'

export class ManufactureModel implements INameId{
    constructor(
        public Id: string,
        public Name: string,        
        public Country: string
    ){}
}