import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-gamers',
  templateUrl: './add-gamers.component.html',
  styleUrls: ['./add-gamers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGamersComponent {
  constructor() {}
}
