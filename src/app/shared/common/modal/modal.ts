import {ComponentRef, Type} from "@angular/core";

export interface Modal<T> {
    content: Type<T>;
    data?: ComponentRef<T>
}
