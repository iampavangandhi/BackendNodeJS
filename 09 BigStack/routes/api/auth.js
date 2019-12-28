const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ auth: "Auth is success" }));

module.exports = router;
