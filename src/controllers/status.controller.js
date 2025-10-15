import db from '../db/connection.js';

export const getAllStatus = async (req, res, next) => {
  try {
    const status = await db('status').select('*');
    res.json(status);
  } catch (err) {
    next(err);
  }
};

export const getStatusById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = await db('status').where({ id }).first();

    if (!status) {
      return res.status(404).json({ error: 'Status not found'});
    }

    res.json(status);
  } catch(err) {
    next(err);
  }
};
