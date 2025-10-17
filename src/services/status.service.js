import Status from '../models/Status.js';

class StatusService {
  async getAllStatus() {
    return await Status.findAll();
  }

  async getStatusById(id) {
    return await Status.findByPk(id);
  }
}

export default new StatusService();
