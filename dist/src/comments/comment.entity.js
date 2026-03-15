"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentResponse = exports.Comment = void 0;
class Comment {
    id;
    content;
    userId;
    assetId;
    createdAt;
    updatedAt;
}
exports.Comment = Comment;
class CommentResponse {
    id;
    content;
    userId;
    assetId;
    createdAt;
    updatedAt;
    user;
}
exports.CommentResponse = CommentResponse;
//# sourceMappingURL=comment.entity.js.map