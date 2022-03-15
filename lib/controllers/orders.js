const { Router } = require('express');
const Order = require('../models/Order');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const order = await Order.insert({
    product: req.body.product,
    quantity: req.body.quantity,
  });

    res.json(order);
  })

  .get('/:id', async (req, res) => {
    const order = await Order.getById(req.params.id)
    res.json(order);
  })

  .get('/', async (req, res) => {
   const orders = await Order.getAll();
    res.json(orders);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      // const { id } = req.params;
      // const result = await pool.query(
      //   `
      //   SELECT * FROM orders WHERE id=$1;
      //   `,
      //   [id]
      // );
      // const existingOrder = result.rows[0];

      const updatedOrder = await Order.updateById(req.params.id, req.body); 

      if (!updatedOrder) {
        const error = new Error(`Order ${id} not found`);
        error.status = 404;
        throw error;
      }

      res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
   const order = await Order.deleteById(req.params.id);
    res.json(order);
  });
