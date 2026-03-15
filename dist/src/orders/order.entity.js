"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderResponse = exports.Order = void 0;
class Order {
    id;
    amount;
    currency;
    status;
    buyerId;
    assetId;
    createdAt;
    updatedAt;
}
exports.Order = Order;
class OrderResponse {
    id;
    amount;
    currency;
    status;
    buyerId;
    assetId;
    createdAt;
    updatedAt;
    asset;
    buyer;
}
exports.OrderResponse = OrderResponse;
//# sourceMappingURL=order.entity.js.map