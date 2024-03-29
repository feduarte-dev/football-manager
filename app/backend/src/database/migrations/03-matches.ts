import { QueryInterface, DataTypes } from "sequelize";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable("matches", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      home_team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "teams",
          key: "id",
        },
      },
      home_team_goals: {
        type: DataTypes.INTEGER,
      },
      away_team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "teams",
          key: "id",
        },
      },
      away_team_goals: {
        type: DataTypes.INTEGER,
      },
      in_progress: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("matches");
  },
};
