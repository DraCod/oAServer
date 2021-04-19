module.exports = app=>{
    const {INTEGER,DATE,STRING} = app.Sequelize;
    return app.model.define('purviews',{
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
}