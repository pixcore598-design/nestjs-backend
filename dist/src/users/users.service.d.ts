import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto, UpdateUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from './user.entity';
export declare class UsersService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        user: UserResponse;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: UserResponse;
    }>;
    findById(id: number): Promise<UserResponse | null>;
    update(id: number, dto: UpdateUserDto): Promise<UserResponse>;
    findAll(): Promise<UserResponse[]>;
    private generateToken;
}
