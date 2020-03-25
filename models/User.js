module.exports = (sequelize, DataTypes)=>(
    sequelize.define('user',{
        email :{
            type : DataTypes.STRING(30),
            allowNull : true,
            unique : true,
        },

        snsId : {
            type : DataTypes.STRING(30),
            allowNull : true,
        },

        password : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },

        salt : {
            type : DataTypes.STRING(64),
            allowNull : false,
        },


        nickname : {
            type : DataTypes.STRING(40),
            allowNull : false,
        },

        provider : {
            type : DataTypes.STRING(40),
            allowNull : false,
            defaultValue : 'local',
        },

        status : {
            type : DataTypes.TINYINT(1),
            allowNull : false,
            defaultValue : 1,
        },

        role : {
            type : DataTypes.TINYINT(1),
            allowNull : false,
            defaultValue : 1,
        },

        p_photo : {
            type : DataTypes.STRING(100),
        },

        gender : {
            type : DataTypes.TINYINT(1),
            allowNull : false,
            defaultValue : 1, 
        },

        noticeCount:{
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        },

        accessedAt : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : sequelize.literal('now()'),
        }
    
    },
    
        {
            timestamps : true,
            paranoid : true,
        }

    
    )

);