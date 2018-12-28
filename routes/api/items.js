const express = require('express');
const router = express.Router();

// Item model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get ALL items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem
    .save()
    .then(item => {
      res.status(201).json(item);
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.remove().then(() => {
        res.status(200).json({ success: true });
      });
    })
    .catch(err => {
      res.status(404).json({ itemnotfound: 'Item not found' });
    });
});

module.exports = router;
