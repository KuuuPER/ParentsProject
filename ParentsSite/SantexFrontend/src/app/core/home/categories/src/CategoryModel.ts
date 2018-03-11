import { INameId } from '../../src/INameId'

export class CategoryModel implements INameId{
    constructor(
        public name: string,
        public id: string
    ){}
}