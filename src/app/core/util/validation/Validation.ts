import { AbstractControl } from '@angular/forms';

export function validInput(control: AbstractControl | null): string | null {
  const formGroup = control?.parent?.controls;

  const controlName =
    Object.keys(formGroup!)?.find(
      (name) => control === control?.parent?.get(name)
    ) || null;

  if (!control?.errors) {
    return null;
  }
  if (!(control.invalid && (control.dirty || control.touched))) {
    return null;
  }
  if (control?.hasError('required')) {
    return `${controlName}  is required`;
  }
  if (control?.hasError('minlength')) {
    return `${controlName} has at least  minimum ${control.errors['minlength'].requiredLength}  characters`;
  }
  if (control?.hasError('invalidPassword')) {
    return "password didn't match";
  }
  return null;
}
