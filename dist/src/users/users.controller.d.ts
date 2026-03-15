import { UsersService } from './users.service';
import { RegisterDto, LoginDto, UpdateUserDto } from './dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        user: import("./user.entity").UserResponse;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: import("./user.entity").UserResponse;
    }>;
    getProfile(req: any): Promise<import("./user.entity").UserResponse | null>;
    updateProfile(req: any, dto: UpdateUserDto): Promise<import("./user.entity").UserResponse>;
    findAll(): Promise<import("./user.entity").UserResponse[]>;
    findOne(id: string): Promise<import("./user.entity").UserResponse | null>;
}
