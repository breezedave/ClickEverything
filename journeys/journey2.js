const actions = [
    ["goto", "http://red.vscreen.org"],
    ["snap"],
    ["type", "#client-name-input input", "bob"],
    ["type", "#session-code-input input", "1111"],
    ["snap"],
    ["click", ".action input"],
    ["snap"]
]

const journey = {
    name: "Failed vScreen login",
    actions: actions
}

module.exports = journey;
