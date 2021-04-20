module.exports = app=>{
    const {INTEGER,DATE,STRING} = app.Sequelize;
    const router = app.model.define("routers",{
        id:{
            type:INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        path:STRING,
        label:STRING,
        parents:INTEGER,
        createdAt:DATE,
        updatedAt:DATE,
    })
    // router.associate = function(){
    //     app.model.Router.belongsToMany(app.model.Purviews,{
    //         through:{
    //             model:app.model.Purviewrouters,
    //             unique:false
    //         },
    //         foreignKey:'routerId',
    //         constraints:false
    //     })
    // }
    return router
    // router.belongsToMany(Tag, {
    //     through: {
    //         model: PostTag,
    //         unique: false,
    //     },
    //     foreignKey: 'postId', //通过外键postId
    //     constraints: false
    // });
}