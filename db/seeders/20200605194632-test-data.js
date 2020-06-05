'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Parks', [
      { parkName: 'Jirisan National Park', city: 'Gurye', provinceState: 'Jeollabuk-do', country: 'South Korea', opened: new Date('1967-12-29'), size: '182,14 sq mi', description: 'the first national park in Korea', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Parks', null, {});
  }
};
