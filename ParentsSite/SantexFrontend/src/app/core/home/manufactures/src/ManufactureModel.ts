import { INameId } from '../../src/INameId'

export class ManufactureModel implements INameId{
    constructor(
        public id: string,
        public name: string,        
        public country: string,
        public description?: string
    ){}
}