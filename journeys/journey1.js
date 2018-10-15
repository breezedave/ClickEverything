const actions = [
    ["goto", "http://localhost:5011/dashboard"]
    , ["waitFor", 2000]
    , ["click", ".FilterControl"]
    , ["snap"]
    , ["clickAllTheThings"]
]

const journey = {
    name: "Single Page Test",
    actions: actions
}

module.exports = journey;
