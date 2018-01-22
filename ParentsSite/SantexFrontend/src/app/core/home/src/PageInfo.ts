export class PageInfo{
    constructor(
        public itemsPerPage: number,
        public itemsCount: number,
        public currentPage: number){}
    
    public pageCount(): number{
        return Math.ceil(this.itemsCount / this.itemsPerPage);
    }
}