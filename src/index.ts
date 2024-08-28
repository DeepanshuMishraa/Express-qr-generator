import express, { Request, Response } from "express";
import QRCode from "qrcode";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.get("/qr", async (req: Request, res: Response) => {
  const link = req.query.link;

  if (typeof link !== 'string' || !link) {
    return res.status(400).json({
      message: "Missing or invalid link parameter"
    });
  }

  try {
    const qr = await QRCode.toDataURL(link);

    res.send(`
      <html>
        <body>
          <h1>Generated QR Code for ${link}</h1>
          <img src="${qr}" alt="QR Code" />
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error generating QR code"
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
