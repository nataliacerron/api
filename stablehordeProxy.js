const express = require("express");
const fetch = require("node-fetch"); // node-fetch v2 compatible con Node 16
const cors = require("cors");
require("dotenv").config();


const app = express();
const PORT = 4000;

app.use(cors()); // Permite que React haga peticiones a este backend
app.use(express.json()); // Para parsear JSON

app.post("/api/generate", async (req, res) => {
  try {
    const response = await fetch("https://stablehorde.net/api/v2/generate/async", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.HORDE_API_KEY || "tu_api_key_aqui",
        "client_agent": "MiApp/1.0",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error llamando a Stable Horde:", error);
    res.status(500).json({ error: "Error al generar imagen" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy backend escuchando en http://localhost:${PORT}`);
});
