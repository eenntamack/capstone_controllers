import express from 'express'

import axios from 'axios'

const router = express.Router();


router.route("/").get(async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/quotes");
    console.log(response.data)
    res.json({ data: response.data });
  } catch (error) {
    console.error("Error processing quotes", error);
    res.status(500).json({ message: "Could not fetch quotes" });
  }
});

export {router}