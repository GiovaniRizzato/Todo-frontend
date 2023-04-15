const DATA = require("../data/todo.json");

module.exports = [
    {
        id: "get-todo-list",
        url: "/api/todo",
        method: "GET",
        variants: [
            {
                id: "success",
                type: "json", // variant of type json
                options: {
                    status: 200, // status to send
                    headers: { // response headers to send
                        "x-custom-header": "foo-header-value",
                    },
                    body: DATA.list
                },
            }
        ]
    }
];