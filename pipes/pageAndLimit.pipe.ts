import { PipeTransform, Injectable } from "@nestjs/common";

@Injectable()
export class ParsePageAndLimitPipe implements PipeTransform {
    transform(value: string) {
        return parseInt(value);
    }
}
