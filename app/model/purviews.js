module.exports = app=>{
    const {INTEGER,DATE,STRING} = app.Sequelize;
    const purview = app.model.define('purviews',{
        id:{
            type:INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        purview:STRING,
        routerId:STRING,
        createdAt:DATE,
        updatedAt:DATE,
    })

    // purview.associate = function(){
    //     app.model.Purview.belongsToMany(app.model.Router,{
    //         through:{
    //             model:app.model.Purviewrouters,
    //             unique:false
    //         },
    //         foreignKey:'purviewId',
    //         constraints:false,
    //     })
    // }
    return purview
}