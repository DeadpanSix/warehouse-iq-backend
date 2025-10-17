import StatusService from '../services/status.service.js';

export const getAllStatus = async (req, res, next) => {
  try {
    const statusList = await StatusService.getAllStatus();
    res.status(200).json(statusList);
  } catch (err) {
    next(err);
  }
};

export const getStatusById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = await StatusService.getStatusById(id);

    if (!status) {
      return res.status(404).json({ message: 'Estatus no encontrado' });
    }

    res.status(200).json(status);
  } catch (err) {
    next(err);
  }
};
