import dateFormat from 'dateformat';

export class DateFormatValueConverter {
   toView(value) {
       return dateFormat(value, "isoDateTime");
   }
}

export class SimpleDateFormatValueConverter {
    toView(value) {
        return dateFormat(value, 'mm/dd/yyyy HH:MM')
    }
}
/* 10022 should show as 22.
 * 10002 should show as 2.
 */
export class TagValueConverter {

    toView(value) {
        const regex = /[1-9]0+([1-9][0-9]?)/;
        if (value < 0) {
          return '';
        }
        let blah = value.toString();
        let foo = regex.exec(blah);
        return foo[1];
    }
}
