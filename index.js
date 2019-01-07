const nodemailer = require('nodemailer');
const gmailConfig = require('./data/gmail_config.json');

const smtpConfig = {
    service: 'Gmail',
    auth: gmailConfig,
};

const transporter = nodemailer.createTransport(smtpConfig);

// Email Config and setup

const Twitter = require('twitter-node-client').Twitter;
const twitterConfig = require('./data/twitter_config.json');

const twitter = new Twitter(twitterConfig);

let currentTweets = [];

// Twitter config and setup

const errorFunc = (err, response, body) => {
    console.log('ERROR ' + err)
};

const successFunc = (data) => {
    const tweets = JSON.parse(data);

    checkNewTweets(tweets.filter(tw => tw.text.includes('Ireland')).map(t => ({id: t.id_str, text: t.text})))
};

const checkNewTweets = (tweetArr) => {
    // console.log(tweetArr);
    // all tweets

    const currentIds = currentTweets.map(ct => ct.id);
    const newTweets = tweetArr.filter(tw => !currentIds.includes(tw.id));

    currentTweets = tweetArr;

    if(newTweets.length > 0) {
        emailTweets(newTweets)
    } else {
        console.log("no new tweets")
    }
};

const emailTweets = (tweets) => {
    console.log(tweets);

    transporter.sendMail({
        from: 'Tweet Alertz',
        to: 'cogrady91@gmail.com',
        subject: 'New SecretFlying Irish Tweet!!',
        text: tweets.map(tw => tw.text).join('\n\n'),
    }, (err, info) => {
        if(err) {
            console.log(err)
        } else {
            console.log(info)
        }
    });
};

const intervalTime = 1000 * 60 * 45;
// poll twitter every 45 mins

setInterval(() => twitter.getUserTimeline({screen_name: 'SecretFlying', count: 200}, errorFunc, successFunc), intervalTime);






