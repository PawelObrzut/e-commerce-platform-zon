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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const axios_1 = __importDefault(require("axios"));
const paginate_1 = __importDefault(require("../middlewares/paginate"));
const filter_1 = __importDefault(require("../middlewares/filter"));
const search_1 = __importDefault(require("../middlewares/search"));
const api_1 = __importDefault(require("../api"));
const router = express_1.default.Router();
router.get('/', passport_1.default.authenticate('authenticateJWT'), filter_1.default, search_1.default, paginate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.status(200).json(res.respondWithData); }));
router.get('/:id', passport_1.default.authenticate('authenticateJWT'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield axios_1.default.get(`${api_1.default}/api/product/${req.params.id}`).then(response => response.data);
        if (product) {
            return res.status(200).json({ responseData: product.data });
        }
    }
    catch (error) {
        return res.status(500).send();
    }
    return res.status(500).send();
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.delete(`${api_1.default}/api/product/${req.params.id}`)
            .catch(error => console.log(error));
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).send();
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.patch(`${api_1.default}/api/product/${req.params.id}`, req.body)
            .catch(error => console.log(error));
        return res.status(200).send();
    }
    catch (error) {
        return res.status(500).send();
    }
}));
exports.default = router;
