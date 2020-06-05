'use strict';
module.exports = (sequelize, DataTypes) => {
  const Park = sequelize.define('Park', {
    parkName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Park Name',
        },
        notEmpty: {
          msg: 'Please provide a value for Park Name',
        },
        len: {
          args: [0, 255],
          msg: 'Park Name must not be more than 255 characters long',
        }
      }
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for City'
        },
        notEmpty: {
          msg: 'Please provide a value for City'
        },
        len: {
          args: [0, 100],
          msg: 'City must not be more than 100 characters long'
        }
      }
    },
    provinceState: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Province/State'
        },
        notEmpty: {
          msg: 'Please provide a value for Province/State'
        },
        len: {
          args: [0, 100],
          msg: 'Province/State must not be more than 100 characters long'
        }
      }
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Country'
        },
        notEmpty: {
          msg: 'Please provide a value for Country'
        },
        len: {
          args: [0, 100],
          msg: 'Country must not be more than 100 characters long'
        }
      }
    },
    opened: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Please provide a valid date for Opened'
        },
        notEmpty: {
          msg: 'Please provide a value for Opened'
        },
        notNull: {
          msg: 'Please provide a value for Opened'
        }
      }
    },
    size: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Size'
        },
        notEmpty: {
          msg: 'Please provide a value for Size'
        },
        len: {
          args: [0, 100],
          msg: 'Size must not be more than 100 characters long'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for Description'
        },
        notNull: {
          msg: 'Please provide a value for Description'
        }
      }
    }
  }, {});
  Park.associate = function(models) {
    // associations can be defined here
  };
  return Park;
};