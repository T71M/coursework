import { User } from '@prisma/client';
export default class UserEntity implements User {
    id: number;
    firstname: string;
    lastname: string;
    surname: string;
    createdAt: Date;
    email: string;
    roleId: number;
    password: string;
}
