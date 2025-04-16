var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTodos, updateTodoOptimistic, updateTodoConfirmed, revertTodoUpdate } from '../features/todos/todosSlice';
import { deleteTodo } from '../features/todos/todosSlice';
import { toast } from 'react-toastify';
export var useTodos = function () {
    var dispatch = useDispatch();
    var todos = useSelector(function (state) { return state.todos.todos; });
    var status = useSelector(function (state) { return state.todos.status; });
    var error = useSelector(function (state) { return state.todos.error; });
    var _a = useState(false), showConfirmation = _a[0], setShowConfirmation = _a[1];
    var _b = useState(null), todoToDelete = _b[0], setTodoToDelete = _b[1];
    useEffect(function () {
        if (status === 'idle') {
            dispatch(fetchTodos());
        }
    }, [dispatch, status]);
    var handleUpdate = function (updatedTodo) { return __awaiter(void 0, void 0, void 0, function () {
        var previousTodo, response, savedTodo, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    previousTodo = todos.find(function (t) { return t.id === updatedTodo.id; });
                    if (!previousTodo)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    dispatch(updateTodoOptimistic(updatedTodo)); // Instant UI update
                    return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/todos/".concat(updatedTodo.id), {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updatedTodo),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to update on server');
                    return [4 /*yield*/, response.json()];
                case 3:
                    savedTodo = _a.sent();
                    dispatch(updateTodoConfirmed(savedTodo)); // Confirm update from server
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    dispatch(revertTodoUpdate(previousTodo)); // Rollback if server failed
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (todoId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setShowConfirmation(true);
            setTodoToDelete(todoId);
            return [2 /*return*/];
        });
    }); };
    var confirmDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(todoToDelete !== null)) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dispatch(deleteTodo(todoToDelete))];
                case 2:
                    _a.sent(); // Dispatch delete action
                    toast.success('Todo deleted successfully!'); // Show success toast
                    setShowConfirmation(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    toast.error('Failed to delete todo'); // Show failure toast
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var cancelDelete = function () {
        setShowConfirmation(false);
        setTodoToDelete(null);
    };
    return {
        todos: todos,
        status: status,
        error: error,
        handleUpdate: handleUpdate,
        handleDelete: handleDelete,
        showConfirmation: showConfirmation,
        confirmDelete: confirmDelete,
        cancelDelete: cancelDelete,
    };
};
