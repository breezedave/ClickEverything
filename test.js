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

          if(action[0] === "snap") {
              await snap(page, journey.name, i);
          } else {
              await page[action[0]].apply(page, action.slice(1,action.length));
          }
      }
  }
  browser.close();
})();


/*
await page.goto('https://github.com/GoogleChrome/puppeteer/issues/2333');
page.waitForSelector(".reponav-item");
page.click(".reponav-item");
page.waitForNavigation();
*/
