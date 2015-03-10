this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/before.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav ng-controller="LogoutCtrl">\n\t<a ng-click="logout()" ui-sref="home">Log out</a>\n</nav>\n<header>\n\t<h1>Step 1</h1>\n\t<h2>Let\'s add your "before" photo</h2>\n</header>\n<main>\n\t<div class="before-picture" ng-hide="shutter === true">\n\t\t<div class="button-area">\n\t\t\t<button class="takePic" ng-click="shutter = true">Take a photo</button>\n\t\t\t<p class="option">Or, if you prefer...</p>\n\t\t\t<label class="uploadPic">\n    \t\t<input type="file" ng-file-select ng-model="files">\n    \t\tChoose a photo to upload\n\t\t\t</label>\n\t\t</div>\n\t</div>\n\n\t<div class="camera" ng-if="shutter === true" ng-cloak></div>\n</main>';

}
return __p
};

this["JST"]["assets/templates/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<main>\n\t<nav>\n        <a ui-sref="home">Home</a>\n        <a ui-sref="login" ng-click="logout()">Log in</a>\n    </nav>\n    <header>\n        <h1>picSumo<h1>\n        <h2>The easiest way to take "before" and "after" pics </h2>\n    </header>\n    <section class="user-form">\n        <form class="signup" ng-submit="register(credentials)" novalidate>\n            <p ng-repeat="errorMessage in error.generic" ng-bind="errorMessage"></p>\n            <label ng-class="error.identifier ? \'error\' : \'\'">\n                <input type="text" placeholder="Enter your email" ng-model="credentials.identifier">\n                <p class="error" ng-bind="error.identifier"></p>\n            </label>\n            <label ng-class="error.password ? \'error\' : \'\'">\n                <input type="password" placeholder="Create a password" ng-model="credentials.password">\n                <p class="error" ng-bind="error.password"><p>\n            </label>\n            <button type="submit">Sign Up</button>\n        </form>\n    </section>\n</main>';

}
return __p
};

this["JST"]["assets/templates/login.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<main>\n\t<nav>\n\t    <a ui-sref="home">Home</a>\n\t    <a ui-sref="login">Log in</a>\n\t </nav>\n\t<h1>Please login</h1>\n<section class="user-form">\n\t<form class="signup" ng-submit="login(credentials)">\n\t\t<label ng-class="error.identifier ? \'error\' : \'\'">\n\t\t\t<input type="text" placeholder="Email" ng-model="credentials.identifier">\n\t\t\t<p class="error" ng-bind="error.identifier"></p>\n\t\t</label>\n\t\t<label ng-class="error.password ? \'error\' : \'\'">\n\t\t\t<input type="password" placeholder="Password" ng-model="credentials.password">\n\t\t\t<p class="error" ng-bind="error.password"></p>\n\t\t</label>\n\t\t<button type="submit">Log in</button>\n\t</form>\n</section>\n</main>\n';

}
return __p
};