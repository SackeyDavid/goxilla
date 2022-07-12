import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
    public config = {
        allowNumbersOnly: true,
        length: 4,
        isPasswordInput: false,
        disableAutoFocus: false,
        placeholder: '',
        inputClass: 'otp-border-radius outline-none',
        inputStyles: { width: '50px', height: '50px' }
    };
  constructor() { }
}
