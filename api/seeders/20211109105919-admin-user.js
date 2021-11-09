'use strict';
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [{
            firstname: 'Admin',
            lastname: 'Admin',
            email: 'admin@mail.com',
            password: bcrypt.hashSync("Moderator", 10),
            createdAt: new Date(),
            updatedAt: new Date(),
            isAdmin: true
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
