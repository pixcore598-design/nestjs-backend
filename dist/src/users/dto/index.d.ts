export declare class RegisterDto {
    email: string;
    username: string;
    password: string;
    nickname?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class UpdateUserDto {
    nickname?: string;
    avatar?: string;
    bio?: string;
}
export declare class UserIdDto {
    id: number;
}
