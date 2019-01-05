const Twitter = require('twitter-node-client').Twitter;
const twitterConfig = require('./data/twitter_config.json');

const twitter = new Twitter(twitterConfig);

let currentTweets = [];

const errorFunc = (err, response, body) => {
    console.log('ERROR ' + err)
};

const successFunc = (data) => {
    const tweets = JSON.parse(data);
    //console.log(tweets);

    checkNewTweets(tweets.filter(tw => tw.text.includes('Ireland')).map(t => ({id: t.id_str, text: t.text})))
};

const checkNewTweets = (tweetArr) => {
    console.log(tweetArr);

    const currentIds = currentTweets.map(ct => ct.id);

    const newTweets = tweetArr.filter(tw => !currentIds.includes(tw.id));
    console.log(newTweets);

    currentTweets = tweetArr;
};

//twitter.getUserTimeline({screen_name: 'SecretFlying', count: 200}, errorFunc, successFunc);

setInterval(() => twitter.getUserTimeline({screen_name: 'SecretFlying', count: 200}, errorFunc, successFunc), 5000);

// const nodemailer = require('nodemailer');
// const gmailConfig = require('./data/gmail_config.json');
//
// const smtpConfig = {
//     service: 'Gmail',
//     auth: gmailConfig,
// };
//
// const transporter = nodemailer.createTransport(smtpConfig);
//
// transporter.sendMail({
//         from: 'Tweet Alertz',
//         to: 'cogrady91@gmail.com',
//         subject: 'Message title',
//         text: 'How are you',
//     }, (err, info) => {
//         if(err) {
//             console.log(err)
//         } else {
//             console.log(info)
//         }
// });


