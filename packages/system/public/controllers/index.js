'use strict';

MathJax.Hub.Config({
    skipStartupTypeset: true,
    messageStyle: 'none',
    'HTML-CSS': {
        showMathMenu: false
    }
});
MathJax.Hub.Configured();

var ExpressionParser = function() {

};

ExpressionParser.prototype.parse = function(input) {
    return '\\frac{5}{4}';
};

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
    function ($scope, Global) {
        var $this = this;
        $this.data = {};

        this.parse = function(input) {
            var ep = new ExpressionParser();
            $this.data.parserOutput = ep.parse(input);
        }
    }
]);


