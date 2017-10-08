const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'MzY2Njc5MzE5MTA5NDM1Mzk2.DLwd3A.675uAMUbQ0e-4OYxn4tSJcrb_gA';

const http = require('http');
const https = require('https');

const express = require('express');
const app = express();

// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!')
// });

client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
    // If the message is "ping"
    if (message.content.includes('!ping')) {

        let context = message.content.replace('!ping ', '');

        if (!context.includes('http://') && !context.includes('https://')) {
            message.channel.send('```You forgot to send a server string with http:// or https://```');
            return;
        }

        if (context.includes('https://')) {
            https.get(context, function (res) {
                message.channel.send("Good News, It's up and working");
            }).on('error', function (e) {
                message.channel.send('Website is down, send the boys over!');
            });
        } else {
            http.get(context, function (res) {
                message.channel.send("Good News, It's up and working");
            }).on('error', function (e) {
                message.channel.send('Website is down, send the boys over!');
            });
        }


    }
});

// Log our bot in
client.login(token);