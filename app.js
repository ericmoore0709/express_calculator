const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({ message: "Success!" });
});

app.get('/mean', (req, res) => {

    const nums = req.query.nums.split(',').map((e) => Number.parseFloat(e));

    const mean = nums.reduce((acc, curr) => { return acc + curr; }, 0) / nums.length;

    res.json({
        response: {
            operation: "mean",
            value: mean
        }
    });
})


app.get('/median', (req, res) => {

    const nums = req.query.nums.split(',').map((e) => Number.parseFloat(e));

    let median = 0;

    if (nums.length % 2 === 0) {

        let firstIdx = Math.floor((nums.length - 1) / 2);

        median = (nums[firstIdx] + nums[firstIdx + 1]) / 2;
    } else {
        median = nums[Math.floor((nums.length - 1) / 2)];
    }

    res.json({
        response: {
            operation: "median",
            value: median
        }
    });
})


app.get('/mode', (req, res) => {

    const nums = req.query.nums.split(',').map((e) => Number.parseFloat(e));

    // mode is the number with the highest count
    const frequency = {};
    let maxFreq = 0;
    let modes = [];

    // Populate frequency object
    nums.forEach(e => {
        if (frequency[e]) {
            frequency[e]++;
        } else {
            frequency[e] = 1;
        }

        // Update max frequency
        if (frequency[e] > maxFreq) {
            maxFreq = frequency[e];
        }
    });

    // Find all numbers with max frequency
    for (const e in frequency) {
        if (frequency[e] === maxFreq) {
            modes.push(Number(e));
        }
    }

    res.json({
        response: {
            operation: "mode",
            value: modes
        }
    });
})

app.listen(3000, () => {
    console.log('App listening on port 3000');
})