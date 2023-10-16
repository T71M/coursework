import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PaginationParams } from 'src/constants';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(query: PaginationParams): Promise<{
        meta: {
            totalItems: number;
            totalPages: number;
        };
        data: {
            firstname: string;
            lastname: string;
            email: string;
            surname: string;
            roleId: number;
            role: import(".prisma/client").Role;
            id: number;
        }[];
    }>;
    getOperators(query: PaginationParams): Promise<{
        meta: {
            totalItems: number;
            totalPages: number;
        };
        data: {
            firstname: string;
            lastname: string;
            email: string;
            surname: string;
            roleId: number;
            role: import(".prisma/client").Role;
            id: number;
        }[];
    }>;
    findOne(id: string): Promise<{
        firstname: string;
        lastname: string;
        email: string;
        surname: string;
        roleId: number;
        role: import(".prisma/client").Role;
        id: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
}
