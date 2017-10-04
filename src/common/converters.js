import dateFormat from 'dateformat';

export class DateFormatValueConverter {
   toView(value) {
       return dateFormat(value, "isoDateTime");
   }

}
