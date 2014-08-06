'use strict';

MathJax.Hub.Config({
    skipStartupTypeset: true,
    messageStyle: 'none',
    'HTML-CSS': {
        showMathMenu: false
    }
});
MathJax.Hub.Configured();

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
    function ($scope, Global) {
        $scope.global = Global;
        $scope.data = {};

        $scope.data.userInput = '\\frac{4}{5}';
    }
]);
