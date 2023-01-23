import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegexService {
  regexPhoneValidator = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  regexStringValidator =
    /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
  regexNumberOnlyValidator = /^\d+$/;

  constructor() {}

  phoneValidator() {
    return this.regexPhoneValidator;
  }

  stringValidator() {
    return this.regexStringValidator;
  }

  numberOnlyValidator() {
    return this.regexNumberOnlyValidator;
  }
}
