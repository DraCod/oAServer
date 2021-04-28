module.exports = app=>{
    const {INTEGER,DATE,STRING} = app.Sequelize;
    const api = app.model.define('apis',{
        id:{
            type:INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        api:STRING,
        createdAt:DATE,
        updatedAt:DATE,
    })
    return api
}