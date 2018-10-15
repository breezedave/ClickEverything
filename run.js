const puppeteer = require("puppeteer");
const viewPorts = require("./viewports.js");
const fs = require("fs");
const rimraf = require("rimraf");

async function snap(page, journeyName, actionNum) {
    for(let i = 0; i < viewPorts.length; i++) {
        let viewPort = viewPorts[i];
        let folder = `images/${viewPort.width}x${viewPort.height}`;

        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
        folder = `${folder}/${journeyName}`;
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
        let fileName = `${folder}/step${actionNum}.png`;

        console.log(`Saving image ${i} of ${viewPorts.length} for ${journeyName} - Step ${actionNum}`);
        await page.setViewport(viewPort);
        await page.screenshot({path: fileName});
    }
}

function getJourneys() {
    const journeyLoc = "./journeys/";
    let journeys = fs.readdirSync(journeyLoc);
    return journeys.map(_ => `${journeyLoc}${_}`);
}

async function clickAllTheThings(page, journey) {
    const btns = await page.evaluate(() => {
        let buttons = document.querySelectorAll('input[type="button"], button');
        let buttonIds = [];

        buttons.forEach((_, i) => {
            if(typeof _.id === "undefined" || _.id === "") _.id = "temp" + i;
        });

        for(let i = 0; i < buttons.length; i++) {
            buttonIds.push(buttons[i].id);
        }

        return buttonIds;
    });

    for(let i = 0; i < btns.length; i++) {
        let btn = btns[i];

        try {
            await page.click(`#${btn}`);
            await page.waitFor(500);
            await snap(page, journey, btn);
        } catch (err) {
            console.log(`Clicking ${btn} failed.`);
        }
    }
}


(async () => {
  for(let i = 0; i < viewPorts.length; i++) {
      let viewPort = viewPorts[i];
      let folder = `images/${viewPort.width}x${viewPort.height}`;

      rimraf.sync(folder);
  }

  let journeys = getJourneys();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for(let i2 = 0; i2 < journeys.length; i2++) {
      let journey = require(journeys[i2]);

      for(let i = 0; i < journey.actions.length; i++) {
          let action = journey.actions[i];

          switch (action[0]) {
                case "snap":
                    await snap(page, journey.name, i);
                    break;
                case "clickAllTheThings":
                    await clickAllTheThings(page, journey.name);
                    break;
                default:
                    await page[action[0]].apply(page, action.slice(1,action.length));
                    break;
          }
      }
  }
  browser.close();
})();
