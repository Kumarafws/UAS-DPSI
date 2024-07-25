const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const File = require('./file');
const Folder = require('./folder')

const Filemanager = sequelize.define('Filemanager', {
    filemanagerID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: 'userID'
        }
    },
    fileID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: File,
            key: 'fileID'
        }
    },
    folderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Folder,
            key: 'folderID'
        }
    },
});

Filemanager.belongsTo(User, { foreignKey: 'userID' });
User.hasMany(Filemanager, { foreignKey: 'userID' });

Filemanager.belongsTo(File, { foreignKey: 'fileID' });
File.hasMany(Filemanager, { foreignKey: 'fileID' });

Filemanager.belongsTo(Folder, { foreignKey: 'folderID' })
Folder.hasOne(Filemanager, { foreignKey: 'folderID' })

module.exports = Filemanager;