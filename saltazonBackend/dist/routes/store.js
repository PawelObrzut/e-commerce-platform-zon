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
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = express_1.default.Router();
router.get('/', authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.status(200).json({ message: "don't try, do!" }); }));
router.get('/:id', authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeResponse = yield fetch(`http://localhost:8000/api/store/${req.params.id}`);
        const storeData = yield storeResponse.json();
        const productResponse = yield fetch('http://localhost:8000/api/product');
        const productData = yield productResponse.json();
        const filteredProducts = productData
            .data.filter((product) => product.storeId === parseInt(req.params.id, 10));
        if (storeData && filteredProducts) {
            return res.status(200).json({
                store: storeData.data.name,
                products: filteredProducts,
            });
        }
    }
    catch (error) {
        return res.status(500).send();
    }
    return res.status(500).send();
}));
router.post('/:id/product', authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        fetch('http://localhost:8000/api/product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category,
                storeId: req.body.storeId,
            }),
        })
            .then(response => response.json())
            .then(data => {
            console.log(data);
            return res.status(201).json({ message: 'new has been product created' });
        });
    }
    catch (error) {
        return res.status(500).send();
    }
    return res.status(500).send();
}));
exports.default = router;
