import { FormControl } from '@angular/forms';

export function notSpaceValidator(control: FormControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (!value || value.trim() === '') {
    return { 'notOnlySpaces': true };
  }
  return null;
}
