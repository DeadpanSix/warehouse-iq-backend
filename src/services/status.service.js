import db from '../db/connection.js';

export const getAllStatusService = async () => {
  const status = await db('status').select('*');
  return status;
};

export const getStatusByIdService = async (id) => {
  const status = await db('status').where({ id }).first();
  return status;
};
