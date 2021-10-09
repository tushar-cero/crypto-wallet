const express = require('express');
const app = express();
const Sequelize = require("sequelize-cockroachdb");
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.urlencoded({extended:false}));

const PORT = 5000;
const HOST = 'localhost';

var sequelize = new Sequelize({
    dialect: "postgres",
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    host: process.env.SQL_HOST,
    port:process.env.SQL_PORT    ,
    database: process.env.SQL_DB,
    dialectOptions: {
      ssl: {
        
        //For secure connection:
        ca: fs.readFileSync('certs/root.crt')
                .toString()
      },
    },
    logging: false, 
  });

const coin = sequelize.define("coin", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
    },
    amount: {
        type: Sequelize.INTEGER,
    },
    orderType:{
        type:Sequelize.TEXT
    },
    change:{
        type:Sequelize.INTEGER,
        default:0
    }
});

const history = sequelize.define("history",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
        type: Sequelize.TEXT,
    },
    amount: {
        type: Sequelize.INTEGER,
    },
    orderType:{
        type:Sequelize.TEXT
    }
})
app.get('/',(req,res)=>{
    res.send('Yay the server works for now');
})

app.post('/newCoin',(req,res)=>{
    //Name of the coin that was bought or sold
    const coinName = req.body.name;
    //If it was Buy or Sell
    const typeOrder = req.body.type;
    //Amount of coins
    const amount = req.body.amount;
    console.log(coinName,type,amount);
    coin.sync({
        force:false
    })
    .then(()=>{
        return coin.bulkCreate([
            {
                name:coinName,
                orderType:typeOrder,
                amount:amount
            }
        ])
    })
    .catch(err=>{
        console.log(err);
    })

    res.send("Successfully Added Coin!");
})

app.listen(PORT,HOST,()=>{
    console.log(`Connected to PORT:${PORT} at HOST:${HOST}`);
})
