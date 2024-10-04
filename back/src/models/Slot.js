module.exports = (sequelize, DataTypes) => {
  const SlotModel = sequelize.define(
    " SlotModel",
    {
      slot_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      reserved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "Slot",
      timestamps: false,
    }
  );

  return SlotModel;
};
