import { InfoTypes } from "./InfoTypes";

export class InfoModel{
    constructor(public title: string, public text: string, public type: InfoTypes){}
}