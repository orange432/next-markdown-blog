import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize({dialect: 'sqlite',storage: './data/storage.db'});

const Article = sequelize.define('article',{
  slug: {type: DataTypes.STRING,primaryKey: true, allowNull: false},
  category: {type: DataTypes.STRING, allowNull: false},
  title: {type: DataTypes.STRING, allowNull: false},
  content: {type: DataTypes.TEXT, allowNull: false},
  image: {type: DataTypes.STRING, allowNull: false},
  published: {type: DataTypes.INTEGER, allowNull: false}
})

export default Article;