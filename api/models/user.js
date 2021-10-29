'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.hasMany(models.Post);
            models.User.hasMany(models.Comment);
            models.User.hasMany(models.Like);
        }
    };
    User.init({
        avatar: {type: DataTypes.STRING, allowNull: true},
        lastname: {type: DataTypes.STRING, allowNull: false},
        firstname: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false, unique: true},
        password: {type: DataTypes.STRING, allowNull: false},
        isAdmin: {type: DataTypes.BOOLEAN, allowNull: false, default: false},
        department: {type: DataTypes.STRING, allowNull: true},
        job: {type: DataTypes.STRING, allowNull: true},
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};