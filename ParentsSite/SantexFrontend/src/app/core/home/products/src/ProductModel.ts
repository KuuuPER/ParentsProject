import { INameId } from "../../src/INameId";

export class ProductModel{
    
    public constructor(
        public Id: string,
        public Name: string,
        public Category: INameId,
        public Manufacture: INameId,
        public Provider: INameId,
        public Count: number) {}
}