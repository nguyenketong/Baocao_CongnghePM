"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
var mongoose_1 = require("mongoose");
var DatabaseConnection = /** @class */ (function () {
    function DatabaseConnection(configService) {
        this.configService = configService;
        this.connection = null;
        this.connectionAttempts = 0;
        this.MAX_RETRIES = 3;
        console.log('🏗️ DatabaseConnection constructor được gọi');
        console.log('⚠️ Lưu ý: Constructor chỉ nên được gọi một lần duy nhất');
    }
    DatabaseConnection.getInstance = function (configService) {
        if (!DatabaseConnection.instance) {
            console.log('🆕 Tạo instance mới của DatabaseConnection');
            DatabaseConnection.instance = new DatabaseConnection(configService);
        }
        else {
            console.log('♻️ Sử dụng instance đã tồn tại của DatabaseConnection');
        }
        return DatabaseConnection.instance;
    };
    DatabaseConnection.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uri, _a, error_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 5]);
                        if (this.connection) {
                            console.log('🔄 Kết nối database đã tồn tại, sử dụng lại');
                            return [2 /*return*/, this.connection];
                        }
                        this.connectionAttempts++;
                        console.log("\uD83D\uDD0C \u0110ang th\u1EED k\u1EBFt n\u1ED1i database (L\u1EA7n th\u1EED ".concat(this.connectionAttempts, "/").concat(this.MAX_RETRIES, ")"));
                        uri = this.configService.get('MONGODB_URI') ||
                            'mongodb+srv://nguyenketong1603:ketong1603@tong.8zcrene.mongodb.net/';
                        _a = this;
                        return [4 /*yield*/, mongoose_1.default.connect(uri, {
                                retryWrites: true,
                                w: 'majority'
                            })];
                    case 1:
                        _a.connection = _c.sent();
                        console.log('✅ Kết nối MongoDB thành công!');
                        console.log("\uD83D\uDCCA Database: ".concat((_b = this.connection.connection.db) === null || _b === void 0 ? void 0 : _b.databaseName));
                        console.log("\uD83D\uDD17 Host: ".concat(this.connection.connection.host));
                        // Thêm event listeners cho connection
                        this.connection.connection.on('error', function (err) {
                            console.error('❌ Database error:', err);
                        });
                        this.connection.connection.on('disconnected', function () {
                            console.log('🔌 Database disconnected');
                        });
                        this.connection.connection.on('reconnected', function () {
                            console.log('🔄 Database reconnected');
                        });
                        return [2 /*return*/, this.connection];
                    case 2:
                        error_1 = _c.sent();
                        console.error('❌ Lỗi kết nối MongoDB:', error_1);
                        if (!(this.connectionAttempts < this.MAX_RETRIES)) return [3 /*break*/, 4];
                        console.log("\uD83D\uDD04 Th\u1EED k\u1EBFt n\u1ED1i l\u1EA1i sau 5 gi\u00E2y...");
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, this.connect()];
                    case 4: throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DatabaseConnection.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connection) return [3 /*break*/, 2];
                        console.log('🔌 Đang ngắt kết nối database...');
                        return [4 /*yield*/, mongoose_1.default.disconnect()];
                    case 1:
                        _a.sent();
                        this.connection = null;
                        console.log('✅ Đã ngắt kết nối database thành công');
                        return [3 /*break*/, 3];
                    case 2:
                        console.log('ℹ️ Không có kết nối database để ngắt');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DatabaseConnection.prototype.getConnection = function () {
        if (this.connection) {
            console.log('📡 Trả về kết nối database hiện tại');
        }
        else {
            console.log('⚠️ Chưa có kết nối database');
        }
        return this.connection;
    };
    DatabaseConnection.prototype.getConnectionStatus = function () {
        var status = mongoose_1.default.connection.readyState;
        var statusMap = {
            0: '🔴 Disconnected',
            1: '🟢 Connected',
            2: '🟡 Connecting',
            3: '🟠 Disconnecting'
        };
        console.log("\uD83D\uDCCA Tr\u1EA1ng th\u00E1i k\u1EBFt n\u1ED1i: ".concat(statusMap[status] || '❓ Unknown'));
        return statusMap[status] || 'Unknown';
    };
    return DatabaseConnection;
}());
exports.DatabaseConnection = DatabaseConnection;
