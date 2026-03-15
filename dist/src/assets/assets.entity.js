"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetListResponse = exports.AssetResponse = exports.Asset = void 0;
class Asset {
    id;
    title;
    description;
    type;
    url;
    thumbnail;
    price;
    currency;
    status;
    tags;
    views;
    likes;
    creatorId;
    createdAt;
    updatedAt;
}
exports.Asset = Asset;
class AssetResponse {
    id;
    title;
    description;
    type;
    url;
    thumbnail;
    price;
    currency;
    status;
    tags;
    views;
    likes;
    creatorId;
    createdAt;
    updatedAt;
    constructor(partial) {
        Object.assign(this, partial);
        if (this.tags && typeof this.tags === 'string') {
            try {
                this.tags = JSON.parse(this.tags);
            }
            catch {
                this.tags = [];
            }
        }
    }
}
exports.AssetResponse = AssetResponse;
class AssetListResponse {
    data;
    total;
    page;
    limit;
    totalPages;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.AssetListResponse = AssetListResponse;
//# sourceMappingURL=assets.entity.js.map