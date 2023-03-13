import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
interface DialogData {
  class: string,
  dosage: string,
  documents: Object[],
  source: string
}
@Component({
  selector: 'app-datamodal',
  templateUrl: './datamodal.component.html',
  styleUrls: ['./datamodal.component.scss']
})
export class DatamodalComponent {
  DialogData: DialogData = {
    class: "",
    dosage: "",
    documents: [],
    source: ""
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<DatamodalComponent>) {
    if (data) {
      this.DialogData = data
    }
  }

}
