import { CreateChargeDto } from "@app/common";
import { Type } from "class-transformer";
import { IsDate, IsDefined, IsNotEmpty, isNotEmptyObject, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator";


export class CreateReservetionDto {

    @IsDate()
    @Type(() =>Date)
    startDate: Date;

    @IsDate()
    @Type(() =>Date)
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    placeId:string;

    @IsString()
    @IsNotEmpty()
    invoiceId:string;


    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateChargeDto)
    charge: CreateChargeDto
}
