const multer  = require('multer');
const path = require('path');
const result = require("../../helpers/result");
const GiftExchangeHistory = require('../../models/gift_exchange_history');
const User = require('../../models/user');

class GiftExchangeHistoryController
{
    static async index(req, res)
    {
        try {
            const exchangeHistories = await GiftExchangeHistory.find({user: req.user.id});
            res.send(exchangeHistories);
        } catch(e) {
            console.log(e.message)
            res.send([]);
        }
    }

    static async create(req, res)
    {
        try {
            const user = await User.findById(req.body.user_id);
            if(!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found'
                });
            }

            const currentPoint = user.point;
            const exchangePoint = req.body.gift_item.point;

            if(currentPoint < exchangePoint) {
                return res.status(200).json({
                    status: 'error',
                    message: 'Points not enough'
                });
            }

            const newPoint = currentPoint - exchangePoint;
            
            const newGiftExchangeHistory = new GiftExchangeHistory({
                user : req.body.user_id,
                gift_item : req.body.gift_item
            });
            const isSaved = await newGiftExchangeHistory.save();

            if(isSaved) {
                user.point = newPoint;
                await user.save();
            }

            result(isSaved, res);
        } catch(e) {
            return res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    }
    
    static async edit(req, res)
    {
        try {
            const giftExchangeHistory = await GiftExchangeHistory.findById(req.params.id).populate('user');
            if(giftExchangeHistory){
                res.send(giftExchangeHistory);
            }else{
                res.status(404).json({"message": "not found"});
            }
        } catch(e) {
            result(false, res);
        }
    }

    static async update(req, res)
    {
        try {
            const giftExchangeHistory = await GiftExchangeHistory.findById(req.body.id);
            // giftExchangeHistory.image = req.body.image;

            const isSaved = await giftExchangeHistory.save();
            result(isSaved, res);
        } catch(e) {
            result(false, res);
        }
    } 

    static async delete(req, res)
    {
        try {
            const giftExchangeHistory = await GiftExchangeHistory.findByIdAndDelete(req.query.id);
            result(giftExchangeHistory, res);
        } catch(e) {
            result(false, res);
        }
    }
}

module.exports = GiftExchangeHistoryController;