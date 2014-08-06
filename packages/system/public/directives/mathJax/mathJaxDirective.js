'use strict';

angular.module('mean.directives', [])
        .directive('mathJax', function() {
            return {
                restrict: 'A',
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
                    console.log($attrs);
                    $scope.$watch($attrs.mathJax, function(value) {
                        var script = angular.element('<script type="math/tex">').html(value === undefined ? '' : value);
                        $element.html('');
                        $element.append(script);
                        MathJax.Hub.Queue(['Reprocess', MathJax.Hub, $element[0]]);
                    });
                }]
            };
        });