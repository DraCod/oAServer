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
        apiId:STRING,
        createdAt:DATE,
        updatedAt:DATE,
    })
    return purview
}