import { IMyOptions } from "angular4-datepicker/src/my-date-picker/interfaces/my-options.interface";
import { IMyDateModel } from "angular4-datepicker/src/my-date-picker/interfaces";

export class DatePickerParams{

    public static datePickerOptions(): IMyOptions{
        return {        
            dateFormat: 'dd.mm.yyyy',
            height: '34px',
            width: '210px',
            inline: false        
        };
    };

    public static selectedDate(date: Date = null) {
        if (date === null) {
            date = new Date();
        }

        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        }
    }

    public static getDate(dateModel: IMyDateModel){
        return new Date(dateModel.date.year, dateModel.date.month - 1, dateModel.date.day);        
    }
}