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
    return router
}