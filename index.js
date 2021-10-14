const cron = require('node-cron');
const express = require('express');
const fs = require('fs');
const shell = require('shelljs');
const nodemailer = require('nodemailer');

app = express();

// Schedule tasks to be run on the server
cron.schedule('* * * * *', function () {
    console.log('running a task every minute');
});

// Remove the error.log file every twenty-first day of the month
cron.schedule('15 10 14 * *', function () {
    console.log('-----------------------');
    console.log('Running Cron Job');

    fs.unlink('./error.log', err => {
        if (err) throw err;

        console.log('Error file successfully deleted');
    });
});

// Backup a database at 11:59 PM every day
cron.schedule('18 10 * * *', function () {
    console.log('-----------------------');
    console.log('Running Cron Job');

    if (shell.exect('sqlite3 database.sqlite .dump > data_dump.sql').code !== 0) {
        shell.exit(1);
    } else {
        shell.echo('Database backup complete');
    }
});

// Create mail transporter
let transporter = nodemailer.createTransport({
    host: 'your_demo_email_smtp_host.example.com',
    port: your_demo_email_port,
    secure: true,
    auth: {
        user: 'your_demo_email_address@example.com',
        pass: 'your_demo_email_password' 
    }
});

// Sending email every Wednesday
cron.schedule('0 0 * * 3', function () {
    console.log('----------------------');
    console.log('Running Cron Job');

    let messageOptions = {
        from: 'your_demo_email_address@example.com',
        to: 'user@example.com',
        subject: 'Scheduled Email',
        text: 'Hi there. This email was automatically sent by us.'
    };

    transporter.sendMail(messageOptions, function(error, info) {
        if (error) {
            throw error;
        } else {
            console.log('Email successfully sent!');
        }
    });
})

app.listen(3000);