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
Object.defineProperty(exports, "__esModule", { value: true });
const paginate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = '1', limit = '10' } = req.query;
        const startIndex = (+page - 1) * +limit;
        const endIndex = +page * +limit;
        const productsCollection = yield fetch('http://127.0.0.1:8000/api/product/')
            .then(response => response.json())
            .catch(error => console.log(error));
        const count = productsCollection.data.length;
        const paginatedData = {
            limit: +limit,
            page: +page,
            count,
            responseData: productsCollection.data.slice(startIndex, endIndex),
        };
        if (startIndex > 0) {
            paginatedData.previous = +page - 1;
        }
        if (endIndex < count) {
            paginatedData.next = +page + 1;
        }
        res.respondWithData = paginatedData;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = paginate;
