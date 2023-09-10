import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddBuyDialogData, DialogResult } from '@app/models';
import { BalanceEditorDialogComponent } from '../balance-editor-dialog/balance-editor-dialog.component';

@Component({
  selector: 'app-add-buy-dialog',
  templateUrl: './add-buy-dialog.component.html',
  styleUrls: ['./add-buy-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBuyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: AddBuyDialogData,
    public dialogRef: MatDialogRef<BalanceEditorDialogComponent>
  ) {
    this.value = data.defaultValue;
  }

  public readonly presets = [200, 500, 1000];

  public value: number;

  public onCancelClick(): void {
    this.dialogRef.close(DialogResult.cancel);
  }

  public incrementValue(val: number): void {
    this.value += val;
  }

  public setValue(val: number): void {
    this.value = val;
  }
}
