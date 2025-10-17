import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const ChangeLog = sequelize.define(
  'ChangeLog',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    action_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    previous_value: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    new_value: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    changed_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    changed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'change_log',
    timestamps: false,
  }
);

export default ChangeLog;
