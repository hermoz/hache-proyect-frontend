import { RoleDto } from './role-dto';

export interface UserDto {

    id: number;
    username: string;
    password: string;
    email: string;
    name: string;
    lastname: string;
    phone: string;
    address: string;
    roles: Set<RoleDto>;

}