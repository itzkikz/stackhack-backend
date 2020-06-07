const express = require("express");
const { registerEvent } = require("../Controllers/event");

const router = express.Router();

router.post("/event/register", registerEvent);

module.exports = router;
