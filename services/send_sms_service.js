
const axios = require('axios');

class SendSMSService{
    url = process.env.SMS_POH_URL;
    

    async sendOTP(phone){
        try{
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': process.env.SMS_POH_TOKEN
            };
            const digit = Math.floor(1000 + Math.random() * 9000);
            let data = {
                to: phone,
                sender: 'Supermobile',
                message: `#OTP - ${digit} is Reward's Verification Code. It will expire in 3 minutes. Do not share this code.`
            }
            const response = await axios.post(this.url, data, { headers } );
            console.log(response.data.data.messages[0].operator);
            return response.data.data.messages[0].operator == "Unknown" ? null : digit;
        }catch(e){
            return null;
        }
    }
}

module.exports = SendSMSService;
