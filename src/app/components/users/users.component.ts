import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@app/models';
import { UserStoreFacade } from '@app/state/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  constructor(private readonly userStateFacade: UserStoreFacade) {}
  public users$: Observable<User[]> = this.userStateFacade.users$;
  ngOnInit(): void {}
}
