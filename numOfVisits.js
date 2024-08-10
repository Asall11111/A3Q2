const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    let numOfVisit = parseInt(req.cookies.numOfVisit) || 0;
    const lastVisit = req.cookies.lastVisit || 'the first time this website is being used';
    numOfVisit += 1;

    const options = {
        timeZone: 'America/Toronto',
        timeZoneName: 'short',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    const date = new Date();
    const currentTime = date.toLocaleTimeString('en-ca', options);

    res.cookie('numOfVisit', numOfVisit, { maxAge: 24 * 60 * 60 * 1000 }); // 1 day
    res.cookie('lastVisit', currentTime, { maxAge: 24 * 60 * 60 * 1000 }); // 1 day

    if (numOfVisit === 1) {
        res.send(`<h1>Welcome to my webpage!</h1>
            <p>It is your first time that you are here.</p>`);
    } else {
        res.send(`<h1>Hello!</h1>
            <p>This is the ${numOfVisit} time that you are visiting my webpage.</p>
            <p>Last time you visited my webpage on: ${lastVisit}</p>`);
    }
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
