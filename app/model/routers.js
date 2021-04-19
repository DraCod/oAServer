module.exports = app=>{
    const {INTEGER,DATE,STRING} = app.Sequelize;
    return  app.model.define("routers",{
        id:{
            type:INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        path:STRING,
        label:STRING,
        createdAt:DATE,
        updatedAt:DATE,
    })
}