module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Coursecate = app.model.define('coursecate', {
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    catename: { type: STRING(10), allownull: false },
    cateicon: { type: STRING(255), allownull: false },
    catesort: { type: INTEGER.UNSIGNED, allownull: false },
  }, {
    tablename: 'course_cate',
    timestamps: false,
  });
  return Coursecate;
};
