"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const tsyringe_1 = require("tsyringe");
const config_1 = require("../../shared/config");
let OtpService = class OtpService {
    constructor(otpRepository, otpBcrypt) {
        this.otpRepository = otpRepository;
        this.otpBcrypt = otpBcrypt;
    }
    generateOtp() {
        return (Math.floor(Math.random() * 9000) + 1000).toString();
    }
    storeOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiresAt = new Date(Date.now() + config_1.config.OtpExpiry * 60 * 1000);
            yield this.otpRepository.saveOtp(email, otp, expiresAt);
        });
    }
    verifyOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const otpEntry = yield this.otpRepository.findOtp(email);
            if (!otpEntry)
                return false;
            if (new Date() > otpEntry.expiresAt ||
                !(yield this.otpBcrypt.compare(otp, otpEntry.otp))) {
                yield this.otpRepository.deleteOtp(email, otp);
                return false;
            }
            yield this.otpRepository.deleteOtp(email, otp);
            return true;
        });
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IOtpRepository")),
    __param(1, (0, tsyringe_1.inject)("IOtpBcrypt")),
    __metadata("design:paramtypes", [Object, Object])
], OtpService);
