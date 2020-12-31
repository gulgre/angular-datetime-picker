import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { TimePickerComponent } from "./time-picker/time-picker.component";
import { CustomDateAdapter, CUSTOM_DATE_FORMATS } from "./custom-date.adapter";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";

@Component({
  selector: "dwf-datetime-picker",
  templateUrl: "./datetime-picker.component.html",
  styleUrls: ["./datetime-picker.component.scss"],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
  encapsulation: ViewEncapsulation.None
})
export class DateTimePickerComponent implements OnInit {
  @Input() value = new Date();
  @Input() placeholder: string;
  @Output() valueChange: EventEmitter<Date> = new EventEmitter<Date>();
  @ViewChild("dialogTrigger", { read: ElementRef, static: true })
  dialogTrigger: ElementRef;
  datePopupUsed: boolean = false;
  constructor(private dialog: MatDialog) {
    this.value = new Date();
  }

  ngOnInit() {    
  }

  updateDate(event) {
    let newDate = event.value;
    if (newDate) {
      if (this.datePopupUsed) {
        this.datePopupUsed = false;
        if (isNaN(this.value.valueOf())) this.value = new Date();
        this.value = new Date(
          newDate.getFullYear(),
          newDate.getMonth(),
          newDate.getDate(),
          this.value.getHours(),
          this.value.getMinutes(),
          this.value.getSeconds()
        );
      } else {
        this.value = newDate;
      }
      this.valueChange.emit(this.value);
    }
  }

  updateTime(newTime: Date) {
    if (!this.value) this.value = new Date();
    if (isNaN(this.value.valueOf())) this.value = new Date();
    this.value = new Date(
      this.value.getFullYear(),
      this.value.getMonth(),
      this.value.getDate(),
      newTime.getHours(),
      newTime.getMinutes(),
      newTime.getSeconds()
    );
    this.valueChange.emit(this.value);
  }

  updateDateTime(newDateTimeInputTarget) {
    console.log(newDateTimeInputTarget);
    if (!this.datePopupUsed) {
      const LEI_REGEX = /\d{1,2}\/\d{1,2}\/\d{2,4}($|(\s+?[01]?\d(:\d{2}((:\d{2})?(\.\d+)?)))(\s?[aApP][mM])?)/;
      if (LEI_REGEX.test(newDateTimeInputTarget.value)) {
        let newDateTime = new Date(newDateTimeInputTarget.value);
        this.value = new Date(
          newDateTime.getFullYear(),
          newDateTime.getMonth(),
          newDateTime.getDate(),
          newDateTime.getHours(),
          newDateTime.getMinutes(),
          newDateTime.getSeconds()
        );
        this.valueChange.emit(this.value);
      }
    }
  }

  onTimeClicked() {
    this.dialog
      .open(TimePickerComponent, {
        data: {
          trigger: this.dialogTrigger,
          startDate: this.value
        },
        backdropClass: "transparent-backdrop"
        // panelClass: "lei-no-padding-dialog"
      })
      .afterClosed();
    // .subscribe(newTime => {
    //   if (newTime) {
    //     this.updateTime(newTime);
    //   }
    // });
  }

  markPopupUsed() {
    this.datePopupUsed = true;
  }
}
