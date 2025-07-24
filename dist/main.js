"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
require("dotenv/config");
async function bootstrap() {
    console.log('🚀 Ứng dụng đang khởi động...');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log('✅ NestJS app đã được tạo');
    const uploadDir = 'uploads';
    const employeeProfileDir = path.join(uploadDir, 'employeeProfile');
    const projectImageDir = path.join(uploadDir, 'projectImage');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
        console.log(`📂 Created directory: ${uploadDir}`);
    }
    if (!fs.existsSync(employeeProfileDir)) {
        fs.mkdirSync(employeeProfileDir);
        console.log(`📂 Created directory: ${employeeProfileDir}`);
    }
    if (!fs.existsSync(projectImageDir)) {
        fs.mkdirSync(projectImageDir);
        console.log(`📂 Created directory: ${projectImageDir}`);
    }
    app.enableCors({
        origin: 'http://localhost:3001',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useStaticAssets('uploads', { prefix: '/uploads' });
    console.log('📂 Serving static files from: uploads');
    await app.listen(3000);
    console.log('🚀 Server is running on ${process.env.NEXT_PUBLIC_API}');
}
bootstrap();
//# sourceMappingURL=main.js.map