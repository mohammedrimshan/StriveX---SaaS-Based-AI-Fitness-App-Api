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
exports.GetUserProgressUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("@/entities/utils/custom.error");
const constants_1 = require("@/shared/constants");
let GetUserProgressUseCase = class GetUserProgressUseCase {
    constructor(_progressRepository) {
        this._progressRepository = _progressRepository;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new custom_error_1.CustomError(constants_1.ERROR_MESSAGES.ID_REQUIRED, constants_1.HTTP_STATUS.BAD_REQUEST);
            }
            try {
                const progress = yield this._progressRepository.findByUser(userId);
                return progress;
            }
            catch (error) {
                throw new custom_error_1.CustomError(constants_1.ERROR_MESSAGES.FAILED_TO_FETCH_PROGRESS, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
exports.GetUserProgressUseCase = GetUserProgressUseCase;
exports.GetUserProgressUseCase = GetUserProgressUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IProgressRepository")),
    __metadata("design:paramtypes", [Object])
], GetUserProgressUseCase);
