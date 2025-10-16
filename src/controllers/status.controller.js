import {
  getAllStatusService,
  getStatusByIdService
} from '../services/status.service.js';

export const getAllStatus = async (req, res, next) => {
  try {
    const status = await getAllStatusService();
    res.json(status);
  } catch (err) {
    next(err);
  }
};

export const getStatusById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = await getStatusByIdService(id);

    if (!status) {
      return res.status(404).json({ error: 'Status not found' });
    }

    res.json(status);
  } catch (err) {
    next(err);
  }
};
