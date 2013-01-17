var jam = {
    "packages": [
        {
            "name": "angularjs",
            "location": "bin-dev/assets/js/lib/angularjs",
            "main": "angular.js"
        },
        {
            "name": "bootstrap",
            "location": "bin-dev/assets/js/lib/bootstrap"
        },
        {
            "name": "jquery",
            "location": "bin-dev/assets/js/lib/jquery",
            "main": "dist/jquery.js"
        }
    ],
    "version": "0.2.12",
    "shim": {}
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "angularjs",
            "location": "bin-dev/assets/js/lib/angularjs",
            "main": "angular.js"
        },
        {
            "name": "bootstrap",
            "location": "bin-dev/assets/js/lib/bootstrap"
        },
        {
            "name": "jquery",
            "location": "bin-dev/assets/js/lib/jquery",
            "main": "dist/jquery.js"
        }
    ],
    "shim": {}
});
}
else {
    var require = {
    "packages": [
        {
            "name": "angularjs",
            "location": "bin-dev/assets/js/lib/angularjs",
            "main": "angular.js"
        },
        {
            "name": "bootstrap",
            "location": "bin-dev/assets/js/lib/bootstrap"
        },
        {
            "name": "jquery",
            "location": "bin-dev/assets/js/lib/jquery",
            "main": "dist/jquery.js"
        }
    ],
    "shim": {}
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}