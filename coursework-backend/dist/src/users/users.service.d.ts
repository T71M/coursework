import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationParams } from 'src/constants';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<import(".prisma/client").User>;
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
    findOne(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        firstname: string;
        lastname: string;
        email: string;
        surname: string;
        roleId: number;
        role: import(".prisma/client").Role;
        id: number;
    }, never>;
    findOneByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import(".prisma/client").User>;
    remove(id: number): Promise<import(".prisma/client").User>;
    getAllOperators(query: PaginationParams): Promise<{
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
}
