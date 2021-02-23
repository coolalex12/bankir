import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [],
  imports: [MatListModule, MatButtonModule, MatIconModule, MatCheckboxModule],
  exports: [MatListModule, MatButtonModule, MatIconModule, MatCheckboxModule],
})
export class MaterialModule {}
