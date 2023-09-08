import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogResult } from '@app/models';

@Component({
  selector: 'app-balance-editor-dialog',
  templateUrl: './balance-editor-dialog.component.html',
  styleUrls: ['./balance-editor-dialog.component.scss'],
})
export class BalanceEditorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { balance: number; gamerName: string },
    public dialogRef: MatDialogRef<BalanceEditorDialogComponent>
  ) {}

  public onCancelClick(): void {
    this.dialogRef.close(DialogResult.cancel);
  }
}
