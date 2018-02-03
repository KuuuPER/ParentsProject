import { INameId } from '../../src/INameId'

export class CategoryModel implements INameId{
    constructor(
        public Name: string,
        public Id: string
    ){}
}