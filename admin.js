function updatePrice() {
    let p = document.getElementById("price").value;
    localStorage.setItem("fakePrice", p);
    alert("Price updated!");
}

function updateBalance() {
    let b = document.getElementById("balance").value;
    localStorage.setItem("fakeBalance", b);
    alert("Balance updated!");
}
