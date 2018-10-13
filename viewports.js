let viewPorts = require("./data/viewportData.js");

viewPorts.sort((a, b) => a.width - b.width);
viewPorts.sort((a, b) => a.height - b.height);

for(i = 1; i < viewPorts.length; i++) {
    if(viewPorts[i].width === viewPorts[i-1].width && viewPorts[i].height === viewPorts[i-1].height) {
        viewPorts[i].remove = true;
    }
}

viewPorts = viewPorts.filter(_ => typeof _.remove === "undefined");

module.exports = viewPorts;
