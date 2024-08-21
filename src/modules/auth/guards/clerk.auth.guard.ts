import { verifyToken } from "@clerk/backend";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ClerkAuthGuard implements CanActivate {
    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        try {
            const payload = await verifyToken(token, {
                jwtKey: process.env.CLERK_JWT_KEY
            });
            console.log("token OK => ", payload);

            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request["user"] = payload;
        } catch (err) {
            console.log("ClerkAuthGuard error : ", err);
            throw new UnauthorizedException();
        }

        return true;
    }
}
