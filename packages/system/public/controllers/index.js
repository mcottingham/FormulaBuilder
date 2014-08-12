'use strict';

MathJax.Hub.Config({
    skipStartupTypeset: true,
    messageStyle: 'none',
    'HTML-CSS': {
        showMathMenu: false
    }
});
MathJax.Hub.Configured();

var ExpressionNode = function (value, children) {
    var $this = this;

    $this.children = children || [];
    $this.value = value || null;
};

//Implements shunting yard algorithm
var ExpressionParser = function (input) {
    var $this = this;

    $this.terminals = [
        {
            labels: ['^'],
            presidence: 4,
            translate: function(terminal, num1, num2) {
                return num1 + '^{' + num2 + '}';
            }
        },
        {
            labels: [ 'x', '*' ],
            presidence: 3,
            translate: function (terminal, num1, num2) {
                return num1 + ' \\times' + num2;
            }
        },
        {
            labels: [ '\\', '/' ],
            presidence: 3,
            translate: function (terminal, num1, num2) {
                return '\\frac{' + num1 + '}{' + num2 + '}';
            }
        },
        {
            labels: [ '+', '-' ],
            presidence: 2,
            translate: function (terminal, num1, num2) {
                return '\\frac{' + num1 + '}{' + num2 + '}';
            }
        },
        {
            labels: [ '(', ')' ],
            presidence: 0,
            translate: angular.noop()
        }
    ];

    $this.tokens = input.split(' ');
    $this.currentTokenIndex = 0;
    $this.operators = ['sentinel'];
    $this.operands = [];

    return $this;
};

ExpressionParser.prototype.getNextToken = function (increment) {
    var $this = this;
    var consume = increment || false;
    var tokenIndex = consume ? $this.currentTokenIndex += 1 : $this.currentTokenIndex + 1;

    if (tokenIndex + 1 < $this.tokens.length) {
        return $this.tokens[tokenIndex];
    }
    return 'end';
};

ExpressionParser.prototype.expect = function (terminal) {
    var $this = this;
    var next = $this.getNextToken();

    if (next === terminal) {
        $this.getNextToken(true);
    }
    else {
        throw 'Syntax error highly probable';
        console.error('Syntax error highly probable');
    }
};

ExpressionParser.prototype.parse = function () {
    var $this = this;
    var tree = $this.generateTree($this.operators, $this.operands);
    $this.expect('end');
    return tree;
};

ExpressionParser.prototype.generateTree = function (operators, operands) {
    var $this = this;
    $this.descend(operators, operands);
};

ExpressionParser.prototype.descend = function (operators, operands) {
    var $this = this;
    var next = $this.getNextToken();

    switch (next) {
        case _.find(_.flatten($this.terminals, 'labels'), next).length > 0:
            $this.operands.push($this.makeLeaf(next));
            $this.getNextToken(true);
            break;
        case next === '(':
            $this.getNextToken(true);
            $this.push(operators, 'sentinel');
            $this.generateTree(operators, operands);
            $this.expect(')');
            $this.operators.pop();
        default:
            throw 'Syntax error highly probable';
            console.error('Syntax error highly probable');
    }
};

ExpressionParser.prototype.makeLeaf = function (value) {
    return new ExpressionNode(value);
};

ExpressionParser.prototype.makeNode = function (operator, children) {
    return new ExpressionNode(operator, children);
};

ExpressionParser.prototype.popOperator = function (operators, operands) {
    var $this = this;
    $this.operands.push($this.makeNode($this.operators.pop(),
        [$this.operands.pop(), $this.operands.pop()]));
};

ExpressionParser.prototype.pushOperator = function (op, operators, operands) {
    var $this = this;
    while( $this.operators[0].presidence > )
};

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
    function ($scope, Global) {
        var $this = this;
        $this.data = {};

        this.parse = function (input) {
//            var ep = new ExpressionParser();
            $this.data.parserOutput = input;
        };
    }
]);


