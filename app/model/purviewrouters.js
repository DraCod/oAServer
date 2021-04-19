module.exports = app=>{
    const {INTEGER,DATE,STRING} = app.Sequelize;
    return app.model.define("users",{
        id:{
            type:INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        purviewId:INTEGER,
        routerId:INTEGER,
        createdAt:DATE,
        updatedAt:DATE
    })
}
