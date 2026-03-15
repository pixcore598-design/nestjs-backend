export declare class User {
    id: number;
    email: string;
    username: string;
    password: string;
    nickname: string | null;
    avatar: string | null;
    bio: string | null;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class UserResponse {
    id: number;
    email: string;
    username: string;
    nickname: string | null;
    avatar: string | null;
    bio: string | null;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<UserResponse>);
}
