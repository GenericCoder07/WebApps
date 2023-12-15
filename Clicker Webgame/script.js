class Timer 
{
    constructor() {
      this.timerId = null;
    }
  
    schedule(task, delay) {
      this.timerId = setTimeout(task, delay);
    }
    cancel() 
    {
        clearTimeout(this.timerId);
    }
}

const upgrade = document.getElementById("upgrade");
upgrade.innerHTML = "Upgrade - Cost: 10 score";
const auto = document.getElementById("auto");

auto.innerHTML = "AutoClickers - 0 - Cost: 200 score";

let upgradeCost = 10;

let autoclickers = 0;
let autoCost = 200;
let clickedAuto = false;

let score = 0;

let chance = 1;
let gain = 1;

const scoreText = document.getElementById("score");

updateScore();

upgrade.addEventListener("click", upgradePoints);
auto.addEventListener("click", buyAutoClicker);

function upgradePoints()
{
    if(score >= upgradeCost)
    {
        score -= upgradeCost;
        updateScore();

        upgradeCost *= 2.1;

        gain *= 1.4;

        updateScore();
        upgrade.innerHTML = "Upgrade - Cost: " + formatNumber(upgradeCost) + " score";
    }
}

const autoTimer = new Timer();

function buyAutoClicker()
{
    if(score >= autoCost)
    {
        autoclickers++;
        score -= autoCost;

        autoCost *= 3.2;

        auto.innerHTML = "AutoClickers - " + formatNumber(autoclickers) + " - Cost: " + formatNumber(autoCost) + " score";
        updateScore();
    }
}

autoTimer.schedule(clickAutomatically, 1000);

function clickAutomatically()
{
    clickedAuto = true;
    click();

    if(autoclickers > 0)
        autoTimer.schedule(clickAutomatically, 1000 / autoclickers);
    else
        autoTimer.schedule(clickAutomatically, 1000);
}


const button = document.getElementById("button");
button.addEventListener("click", click);

function click()
{
    if(clickedAuto && autoclickers > 0)
    {
        score += gain;

        startFade(gain);
    }
    else if(!clickedAuto)
    {
        score += gain;

        startFade(gain);
    }
    
    clickedAuto = false;

    updateScore();
}

const addText = document.getElementById("add");
let timer2 = new Timer();

let amt = 1;
const fadeTime = 1;

function startFade(add)
{
    timer2.cancel();

    timer2 = new Timer();

    amt = 1;

    addText.style.opacity = 1;

    if(add >= 0)
    {
        addText.innerHTML = "+" + formatNumber(add);
        addText.style.color = '#00ff00';
    }
    else
    {
        addText.innerHTML = "" + formatNumber(add);
        addText.style.color = '#ff0000';
    }

    timer2.schedule(fadeText, 100);
}

function fadeText()
{
    addText.style.opacity = amt;

    amt -= 0.007;
    if(amt > 0)
        timer2.schedule(fadeText, fadeTime);
}


function updateScore()
{
    scoreText.innerHTML = "Score: " + formatNumber(score);
}

function formatNumber(digit)
{
    const numberFormatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
      });

    return numberFormatter.format(digit);
}