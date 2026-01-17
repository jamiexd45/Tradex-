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
