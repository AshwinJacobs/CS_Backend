const bodyParser = require("body-parser");
const con = require("../lib/dbConnection");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");

// get cart items from user
router.get("/users/:id/cart", middleware, (req, res) => {
  try {
    const strQuery = "SELECT cart FROM users WHERE user_id = ?";
    con.query(strQuery, [req.user.user_id], (err, results) => {
      if (err) throw err;
      (function Check(a, b) {
        a = parseInt(req.user.user_id);
        b = parseInt(req.params.id);
        if (a === b) {
          //   res.send(results[0].cart);
          console.log(results[0]);
          res.json(results);
        } else {
          res.json({
            c: req.user,
            a,
            b,
            msg: "Please Login To View cart",
          });
        }
      })();
    });
  } catch (error) {
    throw error;
  }
});

// add cart items
router.post("/users/:id/cart", middleware, bodyParser.json(), (req, res) => {
  try {
    let { product_id } = req.body;
    const qcart = `SELECT cart
      FROM users
      WHERE user_id = ?;
      `;
    con.query(qcart, req.user.user_id, (err, results) => {
      if (err) throw err;
      let cart;
      if (results.length > 0) {
        if (results[0].cart === null) {
          cart = [];
        } else {
          cart = JSON.parse(results[0].cart);
        }
      }
      const strProd = `
      SELECT *
      FROM products
      WHERE product_id = ${product_id};
      `;
      con.query(strProd, async (err, results) => {
        if (err) throw err;

        let product = {
          cartid: cart.length + 1,
          id: results[0].id,
          sku: results[0].sku,
          name: results[0].name,
          price: results[0].price,
          weight: results[0].weight,
          descriptions: results[0].descriptions,
          thumbnail: results[0].thumbnail,
          image: results[0].image,
          category: results[0].category,
          create_date: results[0].create_date,
          stock: results[0].stock,
        };

        cart.push(product);
        // res.send(cart)
        const strQuery = `UPDATE users
      SET cart = ?
      WHERE (user_id = ${req.user.user_id})`;
        con.query(strQuery, /*req.user.id */ JSON.stringify(cart), (err) => {
          if (err) throw err;
          res.json({
            results,
            msg: "Product added to cart",
          });
        });
      });
    });
  } catch (error) {
    console.log(error.message);
  }
});

// delete one item from cart
router.delete("/users/:id/cart/:product_id", middleware, (req, res) => {
  const dcart = `SELECT cart
    FROM users
    WHERE id = ?`;
  con.query(dcart, req.user.user_id, (err, results) => {
    if (err) throw err;
    let item = JSON.parse(results[0].cart).filter((x) => {
      return x.cartid != req.params.product_id;
    });
    // res.send(item)
    const strQry = `
    UPDATE users
    SET cart = ?
    WHERE id= ? ;
    `;
    con.query(
      strQry,
      [JSON.stringify(item), req.user.id],
      (err, data, fields) => {
        if (err) throw err;
        res.json({
          msg: "Item Removed from cart",
        });
      }
    );
  });
});

// delete all cart items
router.delete("/users/:id/cart", middleware, (req, res) => {
  const dcart = `SELECT cart 
    FROM users
    WHERE id = ?`;

  con.query(dcart, req.user.user_id, (err, results) => {
    // let cart =
  });
  const strQry = `
    UPDATE users
      SET cart = null
      WHERE (id = ?);
      `;
  con.query(strQry, [req.user.user_id], (err, data, fields) => {
    if (err) throw err;
    res.json({
      msg: "Item Deleted",
    });
  });
});

module.exports = router;
