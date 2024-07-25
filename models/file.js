const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const File = sequelize.define('File', {
    fileID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ukuran: {
        type: DataTypes.STRING,
        allowNull: true
    },
    jenis: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
})

module.exports = File;