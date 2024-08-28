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
const qrcode_1 = __importDefault(require("qrcode"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.get("/qr", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.query.link;
    if (typeof link !== 'string' || !link) {
        return res.status(400).json({
            message: "Missing or invalid link parameter"
        });
    }
    try {
        const qr = yield qrcode_1.default.toDataURL(link);
        res.send(`
      <html>
        <body>
          <h1>Generated QR Code for ${link}</h1>
          <img src="${qr}" alt="QR Code" />
        </body>
      </html>
    `);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error generating QR code"
        });
    }
}));
app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
