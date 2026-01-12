const express = require("express");
const cors = require("cors");
require("./config/env");
require("./config/db");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.send("Bookworm server running........");
});

// app.use(require("./middleware/error.middleware"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Bookworm Server running on port ${PORT}`)
);



