import { MatDateFormats, NativeDateAdapter } from "@angular/material/core";

export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === "input") {
      let millisecond: string = date
        .getMilliseconds()
        .toString()
        .padStart(3, "0");
      let second: string = date
        .getSeconds()
        .toString()
        .padStart(2, "0");
      let minute: string = date
        .getMinutes()
        .toString()
        .padStart(2, "0");
      let hour: string = (date.getHours() % 12 === 0
        ? 12
        : date.getHours() % 12
      )
        .toString()
        .padStart(2, "0");
      let day: string = date
        .getDate()
        .toString()
        .padStart(2, "0");
      let month: string = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear();
      let amPm = date.getHours() < 12 ? "AM" : "PM";
      return `${month}/${day}/${year} ${hour}:${minute} ${amPm}`;
    }
    return date.toDateString();
  }
}

export const LEI_DATE_FORMATS: MatDateFormats = {
  parse: {
    // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    dateInput: {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      millisecond: "numeric"
    }
  },
  display: {
    dateInput: "input",
    monthYearLabel: { year: "numeric", month: "numeric" },
    dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
    monthYearA11yLabel: { year: "numeric", month: "long" }
    //   dateInput: 'YYYY/MM/DD HH:mm:ss.SSS',
    // monthYearLabel: 'YYYY',
    // dateA11yLabel: 'LL',
    // monthYearA11yLabel: 'YYYY',
  }
};
