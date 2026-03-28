import { Injectable } from "@nestjs/common";
import { CelebritiesRepository } from "./celebrities.repository";
import { CelebrityResponseDto } from "./dto/celebrity-response.dto";

type CelebrityWithRelations = Awaited<ReturnType<CelebritiesRepository["findAll"]>>[number];

@Injectable()
export class CelebritiesMapper {
    toCelebrityResponse(celebrity: CelebrityWithRelations): CelebrityResponseDto {
        return {
            id: celebrity.id,
            name: celebrity.name,
            birth: celebrity.birth,
            death: celebrity.death,
            photo: celebrity.photo,
            CelebritiesOnBet: celebrity.CelebritiesOnBet.map((entry) => ({
                betId: entry.betId,
                celebrityId: entry.celebrityId,
                points: entry.points
            }))
        };
    }

    toCelebrityResponseList(celebrities: CelebrityWithRelations[]): CelebrityResponseDto[] {
        return celebrities.map((c) => this.toCelebrityResponse(c));
    }
}
