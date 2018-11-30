const actions = [
    ["goto", "https://demos.telerik.com/kendo-ui/websushi/"],
    ["waitFor", 2000],
    ["snap"],
    ["clickAllTheThings"]
]

const journey = {
    name: "Single Page Test",
    actions: actions
}

module.exports = journey;


/*const actions = [
    ["goto", "http://localhost:5011/dashboard"]
    , ["waitFor", 2000]
    , ["click", ".FilterControl"]
    , ["snap"]
    , ["clickAllTheThings"]
]*/
