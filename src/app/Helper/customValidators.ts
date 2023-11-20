import { FormControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

export function EmailValidator(input: FormControl) {    
    let emailReg: RegExp = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$');
    let valid = true;
    if (input.value) {
        valid = emailReg.test(input.value);
    }
    return valid ? null : {
        invalidEmail: true
    };
}

export function CharactersOnlyValidator(input: FormControl) {
    let numberReg: RegExp = new RegExp('[a-zA-z]+\s?[a-zA-Z]*$');
    let valid = true;
    if (input.value) {
        valid = numberReg.test(input.value);
    }
    return valid ? null : {
        invalidCharacterString: true
    };
}

export function MobileNumberValidator(input: FormControl) {
    let numberReg: RegExp = new RegExp('^\\d{10}$');
    let valid = true;
    if (input.value) {
        valid = numberReg.test(input.value);
    }
    return valid ? null : {
        invalidMobile: true
    };
}
