import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { APP_ROLES } from 'src/constants';
import { User } from '@prisma/client';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(user: any): Promise<{
        user: User;
        token: string;
    }>;
    create(user: CreateUserDto, role?: APP_ROLES): Promise<{
        user: {
            id: number;
            createdAt: Date;
            firstname: string;
            lastname: string;
            surname: string;
            roleId: number;
            email: string;
        };
        token: string;
    }>;
    validateUser(email: string, pass: string): Promise<{
        id: number;
        createdAt: Date;
        firstname: string;
        lastname: string;
        surname: string;
        roleId: number;
        email: string;
    }>;
    checkEmail(email: string): Promise<boolean>;
    getCookieForLogOut(): string;
    private generateToken;
    private hashPassword;
    private comparePassword;
    adminLogin(user: User): Promise<{
        user: User;
        token: string;
    }>;
}
