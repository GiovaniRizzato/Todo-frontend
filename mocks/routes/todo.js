const DATA = require("../data/todo.json");

module.exports = [
    {
        id: "get-todo-list",
        url: "/api/todo",
        method: "GET",
        variants: [
            {
                id: "success",
                type: "json",
                options: {
                    status: 200,
                    headers: {
                        "x-custom-header": "foo-header-value",
                    },
                    body: DATA.list
                },
            }
        ]
    },
    {
        id: "get-todo-id",
        url: "/api/todo/:id",
        method: "GET",
        variants: [
            {
                id: "success",
                type: "json",
                options: {
                    status: 200,
                    headers: {
                        "x-custom-header": "foo-header-value",
                    },
                    body: DATA.details
                },
            }
        ]
    },
    {
        id: "post-new-todo",
        url: "/api/todo",
        method: "POST",
        variants: [
            {
                id: "success",
                type: "json",
                options: {
                    status: 200,
                    headers: {
                        "x-custom-header": "foo-header-value",
                    },
                    body: DATA.details
                },
            }
        ]
    },
    {
        id: "put-todo",
        url: "/api/todo/:id",
        method: "POST",
        variants: [
            {
                id: "success",
                type: "status", 
                options: {
                    status: 201,
                    headers: {
                        "x-custom-header": "foo-header-value",
                    }
                },
            }
        ]
    }
];