import { IsBoolean, IsInt, IsNotEmpty, IsObject, IsString, Length } from "class-validator";

export class NotificationsDTO {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    title: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 200)
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    isRead: boolean;

    @IsNotEmpty()
    @IsInt()
    status: 0 | 1 | 2 | 3;
}
