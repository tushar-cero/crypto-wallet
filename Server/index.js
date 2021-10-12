//ALL THE IMPORTS
const express = require('express');
const app = express();
const Sequelize = require("sequelize-cockroachdb");
const fs = require('fs');
const dotenv = require('dotenv');
const cors = require('cors');

//FILE CONFIGS
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const PORT = process.env.PORT || 5000;

//CONNECTING TO THE DB
var sequelize = new Sequelize({
    dialect: "postgres",
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
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

//CREATING SCHEMAS TO USE WITH THEIR FUNCTION INITIALISERS

//CREATING FUNCTIONS TO CREATE TABLES DYNAMICALLY FOR EACH USER USING THEIR USER ID
const getCoinDB = (userID) => {
    //SCHEMA FOR STORING COINS
    const dbName = 'coin' + userID;
    const coin = sequelize.define(dbName, {
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
        orderType: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.DECIMAL
        }
    },
        {
            // disable the modification of table names; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,
        });
    return coin;
}

const getHistory = (userId) => {
    //SCHEMA TO STORE HISTORY
    const history = sequelize.define(`history-${userId}`, {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.TEXT,
        },
        amount: {
            type: Sequelize.INTEGER,
        },
        orderType: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.DECIMAL,
        }
    },
    {
        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
    })
    return history;
}


//FUNCTION TO RECORD HISTORY OF TRANSACTIONS
const recordHistory = async (Name, amount, Ordertype, price, userid) => {
    console.log("Recording History!");
    const history = getHistory(userid);
    history.sync({
        force: false
    })
        .then(() => {
            return history.bulkCreate([{
                name: Name,
                amount: amount,
                orderType: Ordertype,
                price: price
            }])
        })
        .catch(err => {
            console.log(err);
        })
    console.log("Recorded History!");
}

//FUNCTION TO CHANGE THE COIN DETAILS 
const updateDetails = async (name, orderType, price, amount, userid) => {
    const coin = getCoinDB(userid);
    const currentCoin = await coin.findOne({ where: { name: name } });
    var message = 'Nothing happened';
    console.log(message);
    if (orderType == 'buy') {
        console.log('Order type is Buy');
        const newAmount = parseInt(currentCoin.amount) + parseInt(amount);
        const newPrice = parseInt(currentCoin.price) + parseInt(amount) * parseInt(price);
        await coin.update({ amount: newAmount, price: newPrice }, {
            where: {
                name: name
            }
        });
        message = 'Succesfull Updation';
        recordHistory(name, amount, orderType, price, userid);
    }
    else {
        console.log('Order type is Sell');

        if (amount > currentCoin.amount) {
            message = 'You don\'t hold these many coins kiddo';
        }
        else {
            const newAmount = currentCoin.amount - amount;
            const newPrice = currentCoin.price - amount * price;
            await coin.update({ amount: newAmount, price: newPrice }, {
                where: {
                    name: name
                }
            });
            message = 'Updated Coin!';
            recordHistory(name, amount, orderType, price, userid);
        }
    }
    return message;
}

//HTTP REQUESTS WITH THEIR RESPONSES

app.get('/', (req, res) => {
    res.send('Yay the server works for now');
})

app.get('/history', async (req, res) => {
    const history = getHistory(req.headers.userid);
    var historyData = [];
    try {
    const getHistoryData = await history.findAll({ raw: true });
    getHistoryData.map(coinSet => {
        let dataSet = {
            id: coinSet.id,
            name: coinSet.name,
            amount: coinSet.amount,
            orderType:coinSet.orderType,
            price: coinSet.price
        }
        historyData.push(dataSet);
    })
    const arr = historyData.reverse();
    res.send(arr);
    } catch (error) {
        res.send('New User!');
    }
    
})

//ROUTE TO GET ALL THE COINS FOR THE USERID
app.get('/getCoins', async (req, res) => {
    const coin = getCoinDB(req.headers.userid);
    try {
    const getCoins = await coin.findAll({ raw: true });
    var coinData = [];
    getCoins.map(coinSet => {
        let dataSet = {
            id: coinSet.id,
            name: coinSet.name,
            amount: coinSet.amount,
            price: coinSet.price
        }
        coinData.push(dataSet);
    })
    console.log(coinData);
    res.send(coinData);
    } catch (error) {
        res.send('New User!')
    }
   
})

//ROUTE TO RECORD NEW TRANSACTIONS

app.post('/newCoin', async (req, res) => {
    console.log('user id is');
    console.log(req.headers.userid);
    const coin = getCoinDB(req.headers.userid);
    //Name of the coin that was bought or sold
    const coinName = req.body.name;
    //If it was Buy or Sell
    const typeOrder = req.body.ordertype;
    //Amount of coins
    const amount = req.body.amount;
    //Price at which bought or sold
    const price = req.body.price;
    //TOTAL EVALUATION
    const totalEval = amount * price;
    console.log(coinName, typeOrder, amount, price);
    try {
        const coinCheck = await coin.findOne({ where: { name: coinName } });
        if (coinCheck) {
            console.log('Coin exists and now it needs updation!');
            const getMessage = await updateDetails(coinName, typeOrder, price, amount, req.headers.userid);
            res.send(getMessage);
        }
        else {
            if (typeOrder == 'Sell') {
                res.send('Cannot make a sell transaction since no such coins exists in the db');
            }
            else {
                coin.sync({
                    force: false
                })
                    .then(() => {
                        return coin.bulkCreate([
                            {
                                name: coinName,
                                orderType: typeOrder,
                                amount: amount,
                                price: totalEval
                            }
                        ])
                    })
                    .catch(err => {
                        console.log(err);
                    })
                recordHistory(coinName, amount, typeOrder, price, req.headers.userid);
                res.send("Successfully Added Coin!");
            }
        }
    } catch (error) {
        console.log(error);
        if (typeOrder == 'Sell') {
            res.send('Cannot make a sell transaction since no such coins exists in the db');
        }
        else {
            coin.sync({
                force: false
            })
                .then(() => {
                    return coin.bulkCreate([
                        {
                            name: coinName,
                            orderType: typeOrder,
                            amount: amount,
                            price: totalEval
                        }
                    ])
                })
                .catch(err => {
                    console.log(err);
                })
            recordHistory(coinName, amount, typeOrder, price, req.headers.userid);
            res.send("Successfully Added Coin!");
        }
    }

})

//ROUTE TO DELETE A COIN ON COMMAND

app.delete('/deleteCoin', async (req, res) => {
    const coinName = req.body.name;
    const currentCoin = await coin.findOne({ where: { name: coinName } })
    if (currentCoin != null) {
        const amount = currentCoin.amount;
        const price = currentCoin.price;
        await coin.destroy({
            where: {
                name: coinName
            }
        })
        recordHistory(coinName, amount, 'sell', price);
        res.send(`Successfull Deletion of coin`);
    }
})

//STARTING THE SERVER
app.listen(PORT, () => {
    console.log(`Connected to PORT:${PORT}`);
})
