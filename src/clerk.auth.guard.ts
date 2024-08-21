import { verifyToken } from "@clerk/backend";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class ClerkAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        try {
            const token = request.headers.authorization.replace("Bearer ", "");
            await verifyToken(token, {
                jwtKey: process.env.CLERK_JWT_KEY
            });
            console.log("token OK");
        } catch (err) {
            console.log("catch : ", err);
            return false;
        }

        return true;
    }
}
