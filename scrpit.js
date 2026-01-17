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
setInterval(() => {
    loadChart("XAUUSD");
}, 2000);
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
                function loginUser() {
    let user = document.getElementById("username").value;

    if (!localStorage.getItem(user)) {
        localStorage.setItem(user, JSON.stringify({
            balance: 10000,
            trades: []
        }));
    }

    localStorage.setItem("currentUser", user);

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadUser();
                    <h3>Trade</h3>
<select id="pairTrade">
  <option>USDJPY</option>
  <option>XAUUSD</option>
  <option>BTCUSD</option>
  <option>ETHUSD</option>
</select>

<input id="lotSize" placeholder="Lot (0.01-1)">
<button onclick="openBuy()">Buy</button>
<button onclick="openSell()">Sell</button>

<h3>Open Trades</h3>
<div id="tradesList"></div>
                function openBuy() {
    openTrade("buy");
}

function openSell() {
    openTrade("sell");
}

function openTrade(type) {
    let user = localStorage.getItem("currentUser");
    let data = JSON.parse(localStorage.getItem(user));

    let pair = document.getElementById("pairTrade").value;
    let lot = parseFloat(document.getElementById("lotSize").value);
    let price = lastPrices[pair];

    data.trades.push({
        type: type,
        pair: pair,
        lot: lot,
        openPrice: price,
        time: Date.now()
    });

    localStorage.setItem(user, JSON.stringify(data));
    loadTrades();
}
                    let lastPrices = {};

function loadTrades() {
    let user = localStorage.getItem("currentUser");
    let data = JSON.parse(localStorage.getItem(user));

    let box = document.getElementById("tradesList");
    box.innerHTML = "";

    data.trades.forEach((t, i) => {
        let current = lastPrices[t.pair];
        let profit = calcProfit(t.type, t.lot, t.openPrice, current);

        box.innerHTML += `
            <div style="margin:6px; padding:6px; border:1px solid #555;">
                ${t.type.toUpperCase()} ${t.pair} @ ${t.openPrice}<br>
                Lot: ${t.lot}<br>
                P/L: ${profit.toFixed(2)}<br>
                <button onclick="closeTrade(${i})">Close</button>
            </div>
        `;
    });
}

function calcProfit(type, lot, open, current) {
    let diff = current - open;
    if (type === "sell") diff = open - current;
    return diff * lot * 100;
}

function closeTrade(i) {
    let user = localStorage.getItem("currentUser");
    let data = JSON.parse(localStorage.getItem(user));

    let t = data.trades[i];
    let current = lastPrices[t.pair];
    let profit = calcProfit(t.type, t.lot, t.openPrice, current);

    data.balance += profit;
    data.trades.splice(i, 1);

    localStorage.setItem(user, JSON.stringify(data));
    loadUser();
    loadTrades();
}
}

function loadUser() {
    let user = localStorage.getItem("currentUser");
    let data = JSON.parse(localStorage.getItem(user));
    document.getElementById("welcome").innerText = "Welcome, " + user;
    document.getElementById("balance").innerText = data.balance;
}
            }]
        }
    });
}
