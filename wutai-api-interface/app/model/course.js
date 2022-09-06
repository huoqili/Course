module.exports = app => {
  const { INTEGER, STRING, DATE, DECIMAL } = app.Sequelize;
  const Course = app.model.define('course', {
    cid: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    cname: { type: STRING(20), allowNull: false },
    cdesc: { type: STRING, allowNull: false },
    cthumb: { type: STRING, allowNull: false },
    cprice: { type: DECIMAL(6, 2), allowNull: true, defaultValue: 0.00 },
    cperiod: { type: INTEGER.UNSIGNED, allowNull: false },
    csales: { type: INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    cviews: { type: INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    cevaluate: { type: INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    cteacher: { type: STRING(10), allowNull: false },
    cteacher_position: { type: STRING, allowNull: false },
    cbg: { type: STRING, allowNull: false },
    cintro: { type: STRING, allowNull: false },
    ctimes: { type: DATE, allowNull: true },
    id: { type: INTEGER.UNSIGNED, allowNull: false },
  }, {
    tableName: 'course',
    timestamps: false,
  });
  return Course;
};
