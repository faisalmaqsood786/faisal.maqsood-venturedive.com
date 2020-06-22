
/**
 * User Schema
 */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return User;
};
