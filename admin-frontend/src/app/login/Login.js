"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
var react_1 = require("react");
var link_1 = require("next/link");
var loginHandle_1 = require("../hook/loginHandle");
function Login(_a) {
    var onLoginSuccess = _a.onLoginSuccess;
    var _b = (0, react_1.useState)(""), email = _b[0], setEmail = _b[1];
    var _c = (0, react_1.useState)(""), password = _c[0], setPassword = _c[1];
    var _d = (0, loginHandle_1.useLogin)(onLoginSuccess), loading = _d.loading, error = _d.error, handleLogin = _d.handleLogin;
    var handleSubmit = function (e) {
        e.preventDefault();
        handleLogin(email, password);
    };
    return (<div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="relative w-full max-w-sm p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg">
        <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500 rounded-full transform translate-x-1/2 translate-y-1/2 opacity-30"></div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-6">Sign In</h2>
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email Address" value={email} onChange={function (e) { return setEmail(e.target.value); }} className="w-full px-4 py-2 bg-white bg-opacity-20 text-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white" required/>

          <input type="password" placeholder="Password" value={password} onChange={function (e) { return setPassword(e.target.value); }} className="w-full px-4 py-2 bg-white bg-opacity-20 text-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white" required/>

          <div className="flex justify-between text-sm text-white opacity-80">
            <link_1.default href="/register" className="hover:underline">Register</link_1.default>
            <link_1.default href="/forgot_password" className="hover:underline">Forgot Password?</link_1.default>
          </div>

          <button type="submit" className="w-full py-2 mt-2 text-lg font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>);
}
