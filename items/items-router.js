const express = require("express");
const router = express.Router();

const Items = require("./items-model.js");
// const restricted = require("../auth/middleware/restricted-middleware.js");
const validateItemsContent = require("../auth/middleware/validateItemsContent-middleware");
const verifyItemId = require("../auth/middleware/verifyItemId-middleware.js");


// router.post("/", (req, res) => {
//   Items.addItem(req.body)
//     .then(item => {
//       res.status(201).json(item);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

router.post("/", async (req, res) => {
  const item = req.body;
  try {
    await Items.addItem(item);
    let updatedArray = await Items.getItems();
    return res.status(200).json({
      items: updatedArray,
      message: "Successfully Posted"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
  });
  
//Get Items
router.get("/", (req, res) => {
  Items.getItems()
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Get Users Items
router.get("/:id", verifyItemId, (req, res) => {
  const id = req.params.id;

  Items.getItemsById(id)
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//update Users Item
router.put("/:id", verifyItemId, validateItemsContent, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Items.updateItem(id, changes)
    .then(updatedItem => {
      res.status(201).json(updatedItem);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//delete users Item
router.delete("/:id", verifyItemId, (req, res) => {
  const id = req.params.id;

  Items.deleteItem(id)
    .then(deletedItem => {
      res.status(200).json({ message: "Item successfully deleted." });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//get items by category
router.get("/category/:category", (req, res) => {
  const category = req.params.category;

  Items.getItemsByCategory(category)
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
