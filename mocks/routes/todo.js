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
                    status: 201,
                    body: DATA.details
                },
            },
            {
                id: "error",
                type: "status", 
                options: {
                    status: 500,
                },
            }
        ]
    },
    {
        id: "put-todo",
        url: "/api/todo/:id",
        method: "PUT",
        variants: [
            {
                id: "success",
                type: "status", 
                options: {
                    status: 202,
                },
            },
            {
                id: "error",
                type: "status", 
                options: {
                    status: 500,
                },
            }
        ]
    }
];