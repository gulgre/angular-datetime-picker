import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { DateTimePickerComponent } from "../datetime-picker/datetime-picker.component";
import { TimePickerComponent } from "../datetime-picker/time-picker/time-picker.component";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, DateTimePickerComponent, TimePickerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
