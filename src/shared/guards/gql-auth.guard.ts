import { type CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { PrismaService } from "src/core/prisma/prisma.service";



@Injectable()
export class GqlAuthGuard implements CanActivate {
    constructor(private readonly prismaService: PrismaService) {}
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;

        if(typeof request.sesssion.userId === 'undefined') {
            throw new UnauthorizedException('Пользователь не авторизован');
        }

        const user = await this.prismaService.user.findUnique({
            where: {
                id: request.sesssion.userId
            }
        })

        request.user = user;
        return true;
    }

}