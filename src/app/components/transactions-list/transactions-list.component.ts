import { Component, Input } from '@angular/core';
import { GameTransaction } from '@app/models';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent {
  @Input() transactions!: GameTransaction[] | undefined;
}
