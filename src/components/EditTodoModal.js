var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useEffect, useState } from 'react';
var EditTodoModal = function (_a) {
    var todo = _a.todo, onSave = _a.onSave, onClose = _a.onClose;
    var _b = useState(''), title = _b[0], setTitle = _b[1];
    var _c = useState(false), completed = _c[0], setCompleted = _c[1];
    useEffect(function () {
        setTitle(todo.title);
        setCompleted(todo.completed);
    }, [todo]);
    var handleSubmit = function (e) {
        e.preventDefault();
        var updatedTodo = __assign(__assign({}, todo), { title: title, completed: completed });
        onSave(updatedTodo);
    };
    return (React.createElement("div", { className: "fixed inset-0 bg-black/20 flex justify-center items-center z-50" },
        React.createElement("div", { className: "bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md" },
            React.createElement("h2", { className: "text-2xl font-semibold mb-6 text-gray-800 text-center" }, "Edit Todo"),
            React.createElement("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4" },
                React.createElement("input", { type: "text", value: title, onChange: function (e) { return setTitle(e.target.value); }, className: "border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition", placeholder: "Todo title" }),
                React.createElement("label", { className: "flex items-center gap-2 text-gray-700" },
                    React.createElement("input", { type: "checkbox", checked: completed, onChange: function (e) { return setCompleted(e.target.checked); }, className: "w-4 h-4 accent-gray-600 cursor-pointer" }),
                    "Mark as Completed"),
                React.createElement("div", { className: "flex justify-end gap-3 pt-2" },
                    React.createElement("button", { type: "button", onClick: onClose, className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition cursor-pointer" }, "Cancel"),
                    React.createElement("button", { type: "submit", className: "px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer" }, "Save"))))));
};
export default EditTodoModal;
