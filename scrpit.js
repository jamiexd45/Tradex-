async function loadPrices() {
    let updates = await fetch("updates.json").then(r => r.json());

    let latest = {};

    updates.commands.forEach(cmd => {
        latest[cmd.pair] = cmd.price;
    });

    updateUI(latest);
}

function updateUI(prices) {
    for (let pair in prices) {
        let el = document.getElementById(pair);
        if (el) el.innerText = prices[pair];
    }
}

setInterval(loadPrices, 2000);
async function loadChart(pair) {
    let data = await fetch("chartdata.json").then(r => r.json());
    let candles = data[pair];

    let labels = candles.map(c => new Date(c.time).toLocaleTimeString());
    let prices = candles.map(c => c.close);

    let ctx = document.getElementById('mainChart').getContext('2d');

    if (window.chart) window.chart.destroy();

    window.chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: pair,
                data: prices,
                borderWidth: 2
            }]
        }
    });
}
