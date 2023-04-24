
import sequelize from './models/config';
import initModels from './models/init-models';
const model =  initModels(sequelize);

const express = require("express");
const app = express();
const port = process.env.DB_PORT_NEW || 3000;


const  synUser  = async()=>{

    await sequelize.sync({force: true}).then((result: any) => { 
        console.log(result,'listen to port')
     })
}

