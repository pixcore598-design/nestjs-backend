import { Exclude } from 'class-transformer';

export class User {
  id: number;
  email: string;
  username: string;
  
  @Exclude()
  password: string;
  
  nickname: string | null;
  avatar: string | null;
  bio: string | null;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserResponse {
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

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}