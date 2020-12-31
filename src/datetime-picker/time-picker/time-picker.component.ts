import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ElementRef,
  ViewChild,
  Inject
} from "@angular/core";
import {
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

export enum TimePickerStage {
  hour,
  minute,
  second
}

@Component({
  selector: "dwf-timepicker",
  templateUrl: "time-picker.component.html",
  styleUrls: ["time-picker.component.scss"]
})
export class TimePickerComponent implements OnInit {
  @Input() startTime: Date = new Date();
  @Input() allowSeconds: boolean = false;
  @Output() timeSet: EventEmitter<Date> = new EventEmitter<Date>();
  clockHours: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedTime: Date;
  hourHand: number = 12;
  minuteHand: number = 0;
  secondHand: number = 0;
  isAm: boolean;
  stage: TimePickerStage = TimePickerStage.hour;
  caption: string = "Select Hour";
  constructor(
    public dialogRef: MatDialogRef<TimePickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data && this.data.startDate) this.startTime = this.data.startDate;
    this.selectedTime = this.startTime;
    this.hourHand = this.selectedTime.getHours() % 12;
    this.minuteHand = this.selectedTime.getMinutes();
    this.isAm = this.selectedTime.getHours() <= 11;
  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.data.trigger.nativeElement.getBoundingClientRect();
    matDialogConfig.position = {
      left: `${rect.left - 200}px`,
      top: `${rect.bottom}px`
    };
    this.dialogRef.updatePosition(matDialogConfig.position);
    this.secondHand = this.allowSeconds ? this.selectedTime.getSeconds() : 0;
  }

  getHourClass(hour: number) {
    var selectedClass = "";
    switch (this.stage) {
      case TimePickerStage.hour:
        selectedClass = hour % 12 === this.hourHand ? "selected" : "";
        break;
      case TimePickerStage.minute:
        selectedClass = hour * 5 === this.minuteHand ? "selected" : "";
        break;
      case TimePickerStage.second:
        selectedClass = hour * 5 === this.secondHand ? "selected" : "";
        break;
    }
    return `hourMarker hour-${hour} ${selectedClass}`;
  }

  getTransformAngle(hour: number) {
    let angleRotation = -90 + 360 / (12 * hour);
    return `"{ 'transform':'rotate(${angleRotation}deg) translateX(100px) rotate(${-angleRotation}deg)'}"`;
  }

  getLabel(hour: number) {
    if (this.stage === TimePickerStage.hour) return hour;
    return (hour * 5) % 60;
  }

  setAm(isAm: boolean) {
    if (this.isAm !== isAm) {
      this.isAm = isAm;
      this.selectedTime.setHours(this.hourHand + (this.isAm ? 0 : 12));
      this.selectedTime = new Date(this.selectedTime);
    }
  }

  setTime(value: number) {
    switch (this.stage) {
      case TimePickerStage.hour:
        this.hourHand = value;
        this.selectedTime.setHours(this.hourHand + (this.isAm ? 0 : 12));
        this.selectedTime = new Date(this.selectedTime);
        this.stage = TimePickerStage.minute;
        this.caption = "Select Minutes";
        break;
      case TimePickerStage.minute:
        this.minuteHand = (value * 5) % 60;
        this.selectedTime.setMinutes(this.minuteHand);
        this.selectedTime = new Date(this.selectedTime);
        if (this.allowSeconds) {
          this.stage = TimePickerStage.second;
          this.caption = "Select Seconds";
        } else {
          this.stage = TimePickerStage.hour;
          this.caption = "Select Hour";
        }
        break;
      case TimePickerStage.second:
        this.secondHand = value * 5;
        break;
    }
  }

  complete() {
    // console.log(`Selected time ${new Date(0,0,0,this.hourHand + (this.isAm ? 0: 12), this.minuteHand,).toLocaleTimeString()}`);
    this.timeSet.emit(this.selectedTime);
    this.dialogRef.close(this.selectedTime);
  }

  cancel() {
    this.dialogRef.close();
  }
}
