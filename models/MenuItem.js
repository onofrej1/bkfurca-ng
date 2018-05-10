module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "MenuItem",
    {
      title: {
        type: DataTypes.STRING
      },
      menu_id: {
        type: DataTypes.INTEGER
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      page_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      timestamps: false,
      tableName: 'menu_item'
    }
  );
};
