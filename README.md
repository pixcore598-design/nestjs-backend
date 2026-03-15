# 数字资产交易平台 - 后端

NestJS + Prisma + SQLite 构建的数字资产交易平台后端 API 服务。

## 功能模块

- **用户系统**: 注册、登录、JWT 认证、用户资料管理
- **资产系统**: 资产的 CRUD、点赞、搜索、过滤
- **评论系统**: 资产评论的添加、查看、删除
- **订单系统**: 订单创建、支付、取消

## 技术栈

- NestJS 11
- Prisma 7 (SQLite)
- Passport + JWT
- bcrypt 密码加密

## 快速开始

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 启动开发模式 (热重载)
npm run start:dev

# 启动生产模式
npm run start:prod
```

## 环境变量

在 `.env` 文件中配置：

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
```

## API 端点

### 用户接口
| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| POST | /api/users/register | 用户注册 | 否 |
| POST | /api/users/login | 用户登录 | 否 |
| GET | /api/users/profile | 获取当前用户 | 是 |
| PATCH | /api/users/profile | 更新用户资料 | 是 |
| GET | /api/users | 用户列表 | 否 |
| GET | /api/users/:id | 用户详情 | 否 |

### 资产接口
| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| POST | /api/assets | 创建资产 | 是 |
| GET | /api/assets | 资产列表 | 否 |
| GET | /api/assets/my | 我的资产 | 是 |
| GET | /api/assets/:id | 资产详情 | 否 |
| PATCH | /api/assets/:id | 更新资产 | 是 |
| DELETE | /api/assets/:id | 删除资产 | 是 |
| POST | /api/assets/:id/like | 点赞资产 | 否 |

### 评论接口
| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| POST | /api/comments | 添加评论 | 是 |
| GET | /api/comments/asset/:assetId | 资产评论 | 否 |
| DELETE | /api/comments/:id | 删除评论 | 是 |

### 订单接口
| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| POST | /api/orders | 创建订单 | 是 |
| GET | /api/orders | 订单列表 | 是 |
| GET | /api/orders/:id | 订单详情 | 是 |
| PATCH | /api/orders/:id/pay | 支付订单 | 是 |
| PATCH | /api/orders/:id/cancel | 取消订单 | 是 |

## 数据库

数据库文件位于 `dev.db`。使用 Prisma Studio 查看数据：

```bash
npx prisma studio
```

## 测试

```bash
# 运行单元测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:cov
```