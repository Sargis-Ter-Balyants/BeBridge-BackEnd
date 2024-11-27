import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class IsPaginate implements PipeTransform {
    transform(value: string) {
        const parsedValue = parseInt(value, 10);

        if (!value) return "";

        if (isNaN(parsedValue) || parsedValue <= 0) {
            throw new BadRequestException("Page and limit must be positive integers");
        }

        return parsedValue;
    }
}
