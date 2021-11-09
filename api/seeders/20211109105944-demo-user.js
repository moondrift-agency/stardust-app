'use strict';
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [{
            firstname: 'Jean',
            lastname: 'Dupont',
            email: 'test@mail.com',
            password: bcrypt.hashSync("MotDePasse-@;", 10),
            createdAt: new Date(),
            updatedAt: new Date(),
            isAdmin: false
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
