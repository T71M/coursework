import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(request: any): Promise<{
        user: User;
        token: string;
    }>;
    register(user: CreateUserDto): Promise<{
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
    registerOperator(user: CreateUserDto): Promise<{
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
    whoAmI(request: any): User;
    adminLogin(req: any): Promise<{
        user: User;
        token: string;
    }>;
}
