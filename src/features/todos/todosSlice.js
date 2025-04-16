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
var _a;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
var initialState = {
    todos: [],
    status: 'idle',
    error: null,
};
export var fetchTodos = createAsyncThunk('todos/fetchTodos', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('https://jsonplaceholder.typicode.com/todos')];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); });
// Update Todo action
export var updateTodo = createAsyncThunk('todos/updateTodo', function (todo) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/todos/".concat(todo.id), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(todo),
                })];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    throw new Error('Failed to update todo');
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); });
// Delete Todo action
export var deleteTodo = createAsyncThunk('todos/deleteTodo', function (todoId) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/todos/".concat(todoId), {
                    method: 'DELETE',
                })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error('Failed to delete todo');
                }
                return [2 /*return*/, todoId];
        }
    });
}); });
var todosSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        // 💡 Optimistic: immediately apply the update in the UI
        updateTodoOptimistic: function (state, action) {
            var index = state.todos.findIndex(function (todo) { return todo.id === action.payload.id; });
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        },
        // ✅ Confirmed server update
        updateTodoConfirmed: function (state, action) {
            var index = state.todos.findIndex(function (todo) { return todo.id === action.payload.id; });
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        },
        // ⬅️ Rollback in case of error
        revertTodoUpdate: function (state, action) {
            var index = state.todos.findIndex(function (todo) { return todo.id === action.payload.id; });
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        },
    },
    extraReducers: function (builder) {
        builder
            .addCase(fetchTodos.pending, function (state) {
            state.status = 'loading';
        })
            .addCase(fetchTodos.fulfilled, function (state, action) {
            state.status = 'succeeded';
            state.todos = action.payload;
        })
            .addCase(fetchTodos.rejected, function (state, action) {
            var _a;
            state.status = 'failed';
            state.error = (_a = action.error.message) !== null && _a !== void 0 ? _a : 'Something went wrong';
        })
            .addCase(updateTodo.fulfilled, function (state, action) {
            var index = state.todos.findIndex(function (todo) { return todo.id === action.payload.id; });
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        })
            .addCase(deleteTodo.fulfilled, function (state, action) {
            state.todos = state.todos.filter(function (todo) { return todo.id !== action.payload; });
        })
            .addCase(deleteTodo.rejected, function (state, action) {
            var _a;
            state.status = 'failed';
            state.error = (_a = action.error.message) !== null && _a !== void 0 ? _a : 'Something went wrong while deleting the todo';
        });
    },
});
export var updateTodoOptimistic = (_a = todosSlice.actions, _a.updateTodoOptimistic), updateTodoConfirmed = _a.updateTodoConfirmed, revertTodoUpdate = _a.revertTodoUpdate;
export default todosSlice.reducer;
