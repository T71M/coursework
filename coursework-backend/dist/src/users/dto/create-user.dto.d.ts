import { APP_ROLES } from 'src/constants';
export declare class CreateUserDto {
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly surname: string;
    readonly roleId: APP_ROLES;
    readonly password: string;
}
