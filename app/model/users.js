module.exports = app=>{
    const {INTEGER,DATE,STRING} = app.Sequelize;
    const user = app.model.define("users",{
        id:{
            type:INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        account:STRING,
        password:STRING,
        purviewId:INTEGER,
        createdAt:DATE,
        updatedAt:DATE
    })
    user.associate=function(){
        app.model.User.belongsTo(app.model.Purviews,{
            foreiKey:'purviewId',
            targetKey:'id',
            as
        })
    }
}

// app.associate = function(){
//     app.model.Users.belongsTo(app.model.Purviews,{
//         foreignKey:'purviewId',
//         targetKey:'id',
//         as:'purviews'
//     })
// }