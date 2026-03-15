export class Comment {
  id: number;
  content: string;
  userId: number;
  assetId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CommentResponse {
  id: number;
  content: string;
  userId: number;
  assetId: number;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: number;
    username: string;
    nickname: string | null;
    avatar: string | null;
  };
}