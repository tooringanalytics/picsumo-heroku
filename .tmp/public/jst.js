this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/after.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header>\n\t<div class="step">Step 2</div>\n\t<div class="instruction">Add your "after" photo now or <a class="reminder" ng-href="#/after" ng-click="setReminder = true">or set a reminder to take it later...</a></div>\n</header>\n\n<!-- When you arrive on page, your before photo should appear -->\n\n<div class="frame">\n\n\t<div class="saved-before-image-placeholder" ng-cloak>"Before" Image Placeholder</div>\n\n\t<div class="after-options" ng-if="showAfterPhotoOptions">\n\t\t<div class="button-area">\n\t\t\t<button class="takePic" ng-click="takeAfterPhoto()">Take your \'after\' photo</button>\n\t\t\t<p class="option">Or, if you prefer...</p>\n\t\t\t<label class="uploadPic">\n\t    \t\t<input type="file" ng-file-select ng-model="files">\n\t    \t\tChoose a photo to upload\n\t\t\t</label>\n\t\t</div>\n\t</div>\n\n\t<div class="after-webcam" ng-if="showAfterWebcam" ng-cloak>\n\t\t<div class="after-webcam-placeholder">Webcam Placeholder</div>\n\t\t<button class="snap" ng-click="snapAfterShutter()">Snap photo</button>\n\t</div>\n\n\t<div class="saved-after-image-placeholder" ng-if="showAfterAcceptOptions" ng-cloak>\n\t\t<div class="after-photo">"After" Image Placeholder</div>\n\t\t<div class="button-container">\n\t\t\t<button class="retry" ng-click="retryAfter()">Retry</button>\n\t\t\t<button class="accept" ng-click="accept()" ui-sref="share">Accept</button>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- Reminder option -->\n\n<div ng-if="setReminder === true">\n        <p>We\'ll send you an email reminder</p>\n        When: <select class=\'days\'>\n            <option value="7">In 7 days</option>\n            <option value="14">In 14 days</option>\n            <option value="30">In 30 days</option>\n            <option value="60">In 60 days</option>\n            <option value="90">In 90 days</option>\n        </select>\n        <button class="remind">Remind Me</button>\n</div>\n\n\n\n\t\n\t';

}
return __p
};

this["JST"]["assets/templates/before.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header>\n\t<div class="step">Step 1</div>\n\t<div class="instruction">Add your "before" photo</div>\n</header>\n<main>\n\n<!-- When you click Take Photo, Camera should appear with option to Snap Photo-->\n\t<div class="before-options" ng-if="showPhotoOptions">\n\t\t<div class="button-area">\n\t\t\t<button class="takePic" ng-click="takePhoto()">Take your \'before\' photo</button>\n\t\t\t<p class="option">Or, if you prefer...</p>\n\t\t\t<label class="uploadPic">\n\t    \t\t<input type="file" ng-file-select ng-file-change="upload($files)">\n\t    \t\tChoose a photo to upload\n\t\t\t</label>\n\t\t</div>\n\t</div>\n\n<!-- When you click Snap Photo button the webcam view and Snap Photo button should disappear--> \n\n\t<div ng-if="showWebcam">\n\t\t<div class="webcam-placeholder" ng-cloak>Webcam Placeholder</div>\n\t\t<button class="snap" ng-click="snapShutter()">Snap photo</button>\n\t</div>\n\n<!-- Then the image should appear with options to accept or retry--> \n\n\t<div ng-if="showAcceptOptions" ng-cloak>\n\t\t<figure class="draft-image-placeholder">\n\t\t\tThe Stored Image\n\t\t\t<img ng-src="{{files}}" alt="before picture">\n\t\t\t<figcaption>\n\t\t\t\t<div class="day">Day 1</div>\n\t\t\t\t<div class="date">{{date | date: \'mediumDate\'}}</div>\n\t\t\t</figcaption>\n\t\t</figure>\n\t\t<div class="button-container">\n\t\t\t<button class="retry" ng-click="retry()">Retry</button>\n\t\t\t<button class="accept" ng-click="accept()" ui-sref="after">Accept</button>\n\t\t</div>\n\t</div>\n\n\t<div class="progressBar" style="width:{{progressPercentage}}%">{{progressPercentage}}%</div>\n\t\n</main>';

}
return __p
};

this["JST"]["assets/templates/fake.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="up-buttons">\n\t\t\t\t\t\t<div ng-file-select ng-model="files" class="upload-button"\n\t\t\t\t\t\t\t ng-multiple="false" ng-accept="\'*.pdf,*.jpg,*.png\'" ng-model-rejected="rejFiles"\n\t\t\t\t\t\t\t tabindex="0">Attach an Image or PDF</div>\n</div>\n\n\t\t<ul style="clear:both" ng-show="rejFiles.length > 0" class="response">\n\t\t\t<li class="sel-file" ng-repeat="f in rejFiles">\n\t\t\t\tRejected file: {{f.name}} - size: {{f.size}}B - type: {{f.type}}\n\t\t\t</li>\n\t\t</ul>\n\t\t<ul style="clear:both" ng-show="files.length > 0" class="response">\n\t\t\t<li class="sel-file" ng-repeat="f in files">\n\t\t\t\t<img ng-show="f.dataUrl" ng-src="{{f.dataUrl}}" class="thumb">\n\t\t\t\t<span class="progress" ng-show="f.progress >= 0">\t\t\t\t\t\t\n\t\t\t\t\t<div style="width:{{f.progress}}%">{{f.progress}}%</div>\n\t\t\t\t</span>\t\t\t\t\n\t\t\t\t<button class="button" ng-click="f.upload.abort();f.upload.aborted=true" \n\t\t\t\t\t\tng-show="f.upload != null && f.progress < 100 && !f.upload.aborted">Abort</button>\n\t\t\t\t{{f.name}} - size: {{f.size}}B - type: {{f.type}}\n\t\t\t\t<a ng-show="f.result" href="javascript:void(0)" ng-click="f.showDetail = !f.showDetail">details</a>\n\t\t\t\t<div ng-show="f.showDetail">\n\t\t\t\t\t<br/>\n\t\t\t\t\t<div data-ng-show="f.result.result == null">{{f.result}}</div>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li ng-repeat="item in f.result.result">\n\t\t\t\t\t\t\t<div data-ng-show="item.name">file name: {{item.name}}</div>\n\t\t\t\t\t\t\t<div data-ng-show="item.fieldName">name: {{item.fieldName}}</div>\n\t\t\t\t\t\t\t<div data-ng-show="item.size">size on the serve: {{item.size}}</div>\n\t\t\t\t\t\t\t<div data-ng-show="item.value">value: {{item.value}}</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<div data-ng-show="f.result.requestHeaders" class="reqh">request headers: {{f.result.requestHeaders}}</div>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t</ul>\n\n\t\t<br/>\n\t\t<div style="clear:both" class="err" ng-show="errorMsg != null">{{errorMsg}}</div>\n\t</div>';

}
return __p
};

this["JST"]["assets/templates/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<main>\n    <header>\n        <div class="logo">picSumo</div>\n        <div class="tagline">The easiest way to take and store your progress pics.</div>\n    </header>\n    <section class="user-form">\n        <form class="signup" ng-submit="register(credentials)" novalidate>\n            <p ng-repeat="errorMessage in error.generic" ng-bind="errorMessage"></p>\n            <label ng-class="error.identifier ? \'error\' : \'\'">\n                <input type="text" placeholder="Enter your email" ng-model="credentials.identifier">\n                <p class="error" ng-bind="error.identifier"></p>\n            </label>\n            <label ng-class="error.password ? \'error\' : \'\'">\n                <input type="password" placeholder="Create a password" ng-model="credentials.password">\n                <p class="error" ng-bind="error.password"><p>\n            </label>\n            <button type="submit">Sign Up</button>\n        </form>\n    </section>\n</main>';

}
return __p
};

this["JST"]["assets/templates/login.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<main>\n\n<div class="step">Please login</div>\n<section class="user-form">\n\t<form class="signup" ng-submit="login(credentials)">\n\t\t<label ng-class="error.identifier ? \'error\' : \'\'">\n\t\t\t<input type="text" placeholder="Email" ng-model="credentials.identifier">\n\t\t\t<p class="error" ng-bind="error.identifier"></p>\n\t\t</label>\n\t\t<label ng-class="error.password ? \'error\' : \'\'">\n\t\t\t<input type="password" placeholder="Password" ng-model="credentials.password">\n\t\t\t<p class="error" ng-bind="error.password"></p>\n\t\t</label>\n\t\t<button type="submit">Log in</button>\n\t</form>\n</section>\n</main>\n';

}
return __p
};

this["JST"]["assets/templates/share.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header>\n\t<div class="step">Step 3</div>\n\t<div class="instruction">Share your photo or <a class="reminder" ng-href="#/share"> download it</a>.</div>\n</header>\n\n<div class="frame">\n\t<div class="shared-before-image-placeholder" ng-cloak>"Before" Image Placeholder</div>\n\t<div class="shared-after-image-placeholder" ng-cloak> "After" Image Placeholder</div>\n</div>\n';

}
return __p
};