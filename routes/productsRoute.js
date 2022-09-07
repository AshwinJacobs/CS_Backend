const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const middleware = require("../middleware/auth");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM products WHERE product_id ="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/", (req, res) => {
  // if (req.res) {
  try {
    let {
      sku,
      name,
      price,
      weight,
      descriptions,
      thumbnail,
      image,
      category,
      create_date,
      stock,
    } = req.body;

    create_date = new Date().toISOString().slice(0, 10);
    // Insert product
    con.query(
      `INSERT into products (name,	price, descriptions,	image,	category,	create_date, stock) 
      values (?,?,?,?,?,?,?)`,
      [name, price, descriptions, image, category, create_date, stock],
      (err, result) => {
        if (err) throw err;
        res.json({ result: result });
      }
    );
  } catch (error) {
    console.log(error);
  }
  // } else {
  // res.send("Access Denied");
  // }
});

// edit product
router.put("/:id", (req, res) => {
  const {
    sku,
    name,
    price,
    weight,
    descriptions,
    thumbnail,
    image,
    category,
    create_date,
    stock,
  } = req.body;
  try {
    con.query(
      `UPDATE products SET name="${name}",price="${price}",
      descriptions="${descriptions}",
      image="${image}",category="${category}",stock="${stock}"  WHERE product_id="${req.params.id}"`,
      // `UPDATE products SET sku="${sku}",name="${name}",price="${price}",weight="${weight}",descriptions="${descriptions}",thumbnail="${thumbnail}",image="${image}",category="${category}", create_date="${create_date}" ,stock="${stock}"  WHERE product_id="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.json({
          msg: `Edited this gadget`,
          results: result,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// delete products
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM products  WHERE product_id="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.json({
          msg: `This gadget is deleted`,
          result: result,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
