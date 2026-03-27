import { Injectable } from "@nestjs/common";
import { BetsRepository } from "./bets.repository";
import { BetResponseDto, CelebrityOnBetResponseDto } from "./dto/bet-response.dto";

type BetWithRelations = Awaited<ReturnType<BetsRepository["findAll"]>>[number];
type CelebrityOnBetWithRelations = Awaited<ReturnType<BetsRepository["addCelebrity"]>>;

@Injectable()
export class BetsMapper {
    toBetResponse(bet: BetWithRelations): BetResponseDto {
        return {
            id: bet.id,
            userId: bet.userId,
            circleId: bet.circleId,
            year: bet.year,
            createdAt: bet.createdAt,
            updatedAt: bet.updatedAt,
            user: {
                id: bet.user.id,
                clerkId: bet.user.clerkId,
                email: bet.user.email,
                username: bet.user.username,
                firstname: bet.user.firstname,
                lastname: bet.user.lastname,
                image: bet.user.image
            },
            Circle: bet.Circle
                ? {
                      id: bet.Circle.id,
                      name: bet.Circle.name,
                      visibility: bet.Circle.visibility,
                      status: bet.Circle.status,
                      code: bet.Circle.code
                  }
                : null,
            CelebritiesOnBet: bet.CelebritiesOnBet.map((entry) => ({
                betId: entry.betId,
                celebrityId: entry.celebrityId,
                points: entry.points,
                celebrity: {
                    id: entry.celebrity.id,
                    name: entry.celebrity.name,
                    birth: entry.celebrity.birth,
                    death: entry.celebrity.death,
                    photo: entry.celebrity.photo
                }
            }))
        };
    }

    toBetResponseList(bets: BetWithRelations[]): BetResponseDto[] {
        return bets.map((bet) => this.toBetResponse(bet));
    }

    toCelebrityOnBetResponse(entry: CelebrityOnBetWithRelations): CelebrityOnBetResponseDto {
        return {
            betId: entry.betId,
            celebrityId: entry.celebrityId,
            points: entry.points,
            createdAt: entry.createdAt,
            updatedAt: entry.updatedAt,
            celebrity: {
                id: entry.celebrity.id,
                name: entry.celebrity.name,
                birth: entry.celebrity.birth,
                death: entry.celebrity.death,
                photo: entry.celebrity.photo
            }
        };
    }
}
