const multer  = require('multer');
const path = require('path');
const result = require("../../helpers/result");
const GiftExchangeHistory = require('../../models/gift_exchange_history');

class GiftExchangeHistoryController
{
    static async index(req, res)
    {
        try {
            const exchangeHistories = await GiftExchangeHistory.find().populate('user');
            res.send(exchangeHistories);
        } catch(e) {
            console.log(e.message);
            res.send([]);
        }
    }
    
    static async edit(req, res)
    {
        try {
            const exchangeHistory = await GiftExchangeHistory.findById(req.params.id).populate('user');
            res.send(exchangeHistory);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = GiftExchangeHistoryController;