import React from 'react';
import { FaSearch } from 'react-icons/fa';
export default function FilterBar(_a) {
    var search = _a.search, setSearch = _a.setSearch, filter = _a.filter, setFilter = _a.setFilter;
    return (React.createElement("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-4 mb-6" },
        React.createElement("div", { className: "relative w-full sm:w-1/2" },
            React.createElement(FaSearch, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" }),
            React.createElement("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "Search todos...", className: "w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition" })),
        React.createElement("select", { value: filter, onChange: function (e) { return setFilter(e.target.value); }, className: "p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition cursor-pointer" },
            React.createElement("option", { value: "All" }, "All"),
            React.createElement("option", { value: "Completed" }, "Completed"),
            React.createElement("option", { value: "Incomplete" }, "Incomplete"))));
}
