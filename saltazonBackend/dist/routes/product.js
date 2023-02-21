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
const paginate_1 = __importDefault(require("../middlewares/paginate"));
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = express_1.default.Router();
router.get('/', authenticateToken_1.default, paginate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json(res.respondWithData);
}));
router.get('/:id', authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (yield fetch(`http://localhost:8000/api/product/${req.params.id}`)).json();
        if (product) {
            return res.status(200).json(product.data);
        }
    }
    catch (error) {
        return res.status(500).send();
    }
}));
exports.default = router;
