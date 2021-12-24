import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Entity } from '@app/models';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-entity-select-list',
  templateUrl: './entity-select-list.component.html',
  styleUrls: ['./entity-select-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntitySelectListComponent),
      multi: true,
    },
  ],
})
export class EntitySelectListComponent implements ControlValueAccessor {
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      array: this.fb.array([]),
    });
  }

  form: FormGroup;

  get formArray() {
    return this.form.get('array') as FormArray;
  }

  private _items: Entity[] = [];
  @Input() set items(val: Entity[]) {
    this._items = val;
    this.fillFormArray(val);
  }

  get items(): Entity[] {
    return this._items;
  }

  writeValue(val: Entity[] | null): void {
    for (const [index, item] of this.items.entries()) {
      if (val?.some((innerVal) => innerVal.id === item.id)) {
        this.formArray.controls[index].setValue(true);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.formArray.valueChanges
      .pipe(map(this.innerValueToOutput.bind(this)), untilDestroyed(this))
      .subscribe((val) => {
        fn(val);
      });
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  private fillFormArray(items: Entity[]) {
    items.map((gamer) => {
      this.formArray.push(new FormControl(false));
    });
  }

  private innerValueToOutput(val: boolean[]): Entity[] {
    const result = val.reduce(
      (acc: Entity[], value: boolean, i: number) =>
        value ? [...acc, this.items[i]] : acc,
      []
    );

    return result;
  }

  private onTouched = () => {};
}
