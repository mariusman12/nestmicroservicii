import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReservetionDocument } from "./models/reservetion.schema";


@Injectable()
export class ReservetionsRepository extends AbstractRepository<ReservetionDocument> {
    protected readonly logger = new Logger(ReservetionsRepository.name)

    constructor(
        @InjectModel(ReservetionDocument.name) reservetionModel: Model<ReservetionDocument>,){
            super(reservetionModel)
        }

}