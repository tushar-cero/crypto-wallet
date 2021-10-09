//ALL THE IMPORTS
const express = require('express');
const app = express();
const Sequelize = require("sequelize-cockroachdb");
const fs = require('fs');
const dotenv = require('dotenv');


//FILE CONFIGS
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({extended:false}));

const PORT = 5000;
const HOST = 'localhost';

//CONNECTING TO THE DB
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

//CREATING SCHEMAS TO USE

//SCHEMA FOR STORING COINS
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
    },
    price:{
        type:Sequelize.DECIMAL
    }
});

//SCHEMA TO STORE HISTORY
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

//FUNCTION TO RECORD HISTORY OF TRANSACTIONS
const recordHistory = (Name,amount,Ordertype) =>{
    history.sync({
        force:false
    })
    .then(()=>{
        return history.bulkCreate([{
            name:Name,
            amount:amount,
            orderType:Ordertype
        }])
    })
    .catch(err=>{
        console.log(err);
    })
    console.log("Recorded History!");
}


//HTTP REQUESTS WITH THEIR RESPONSES
app.get('/',(req,res)=>{
    res.send('Yay the server works for now');
})

app.get('/history',async (req,res)=>{
    const getHistory = await history.findAll();
    console.log(getHistory);
    console.log("Showing history now!");
    res.send("Here is History!");
})

app.get('/getCoins',async (req,res)=>{
    const getCoins = await coin.findAll();
    console.log(getCoins);
    console.log("Now showing Coins");
    res.send("Here is Coins!");

})

app.post('/newCoin',(req,res)=>{
    //Name of the coin that was bought or sold
    const coinName = req.body.name;
    //If it was Buy or Sell
    const typeOrder = req.body.ordertype;
    //Amount of coins
    const amount = req.body.amount;
    //Price at which bought or sold
    const price = req.body.price
    console.log(coinName,typeOrder,amount);
    coin.sync({
        force:false
    })
    .then(()=>{
        return coin.bulkCreate([
            {
                name:coinName,
                orderType:typeOrder,
                amount:amount,
                price:price
            }
        ])
    })
    .catch(err=>{
        console.log(err);
    })
    recordHistory(coinName,amount,typeOrder);
    res.send("Successfully Added Coin!");
})

app.delete('/deleteCoin',async (req,res)=>{
    const coinName = req.body.name;
    if(await coin.findOne({ where:{name:coinName}})){
        await coin.destroy({
            where:{
                name:coinName
            }
        })  
        res.send(`Successfull Deletion of coin`);
    }
})

//STARTING THE SERVER
app.listen(PORT,HOST,()=>{
    console.log(`Connected to PORT:${PORT} at HOST:${HOST}`);
})
