import { Injectable } from "@angular/core";
import { HttpClient } from "selenium-webdriver/http";

@Injectable()
export class ImportService{
    constructor(public httpClient: HttpClient){}
}