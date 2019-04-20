import { ValidatorFn, AbstractControl } from '@angular/forms';

export function minMaxValueValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const invalid = (control.value < min || control.value > max);
    return invalid ? {minMaxValue: {value: control.value}} : null;
  };
}
