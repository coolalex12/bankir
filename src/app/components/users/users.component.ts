import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Gamer } from '@app/models';
import { UserStoreFacade } from '@app/state/user';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  constructor(
    private readonly userStateFacade: UserStoreFacade,
    private dbService: NgxIndexedDBService
  ) {
    // this.dbService
    //   .add('users', {
    //     name: `Bruce Wayne`,
    //     email: `bruce@wayne.com`,
    //   })
    //   .subscribe((key) => {
    //     console.log('key: ', key);
    //   });
    // this.dbService
    //   .add('users', {
    //     name: `Test`,
    //     email: `test@wayne.com`,
    //   })
    //   .subscribe((key) => {
    //     console.log('key: ', key);
    //   });
    //     this.dbService.openCursorByIndex('users', 'name', IDBKeyRange.only("Bruce Wayne")).subscribe((evt) => {
    //       var cursor = (evt.target as IDBOpenDBRequest).result;
    //       if(cursor) {
    //           console.log(cursor);
    //           // cursor.continue();
    //       } else {
    //           console.log('Entries all displayed.');
    //       }
    //   });
  }
  public users$: Observable<Gamer[]> = this.userStateFacade.allUsers$;
}
