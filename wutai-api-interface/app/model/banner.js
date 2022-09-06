// eslint-disable-next-line strict
module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Banner = app.model.define('banner', {
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    banner: { type: STRING, allownull: false },
    bsort: { type: INTEGER.UNSIGNED, allownull: true },
  }, {
    tablename: 'banner',
    timestamps: false,
  });
  return Banner;
};
