fetch('./data.json')
.then(response => response.json())
.then(data => {

    createChart(data);

}).catch(error => console.error("Json Error: ", error));

const daysWeek = document.querySelector(".days-week");

function createChart (data) {

    const maxAmount = Math.max(...data.map(item => item.amount));

    data.forEach(item => {

        const day = document.createElement("div");
        
        day.classList.add("days");
        
        day.setAttribute("role", "listitem");


        const amount = document.createElement("span");

        amount.textContent = `$${item.amount}`;

        amount.classList.add("amount");

        amount.setAttribute("aria-hidden", "true");


        const bar = document.createElement("div");

        bar.classList.add("bar");

        bar.setAttribute("tabindex", "0");

        bar.setAttribute("aria-label", `${item.day}: ${item.amount}`);

        if (isCurrentDay(item.day)) {

            bar.style.backgroundColor = "var(--blue-300)";

            bar.setAttribute("aria-label", `${item.day}: ${item.amount}, current day`);

            bar.setAttribute("aria-current", "date");

        } 



        const barHeight = (item.amount / maxAmount) * 150;

        bar.style.height = `${barHeight}px`;


        const amountBottom = barHeight + 32;

        amount.style.bottom = `${amountBottom}px`;


        const label = document.createElement("p");

        label.textContent = item.day;
        
        day.append(amount, bar, label);

        daysWeek.appendChild(day);

    });

}

function isCurrentDay (day) {

    const currentDay = new Date().toLocaleDateString("en-US", {
        weekday: "short"
    }).toLowerCase();

    return day === currentDay;

}