/*!
 * angular-bayan
 * @version  v1.0.0
 * @author   Gerrproger
 * Website:  http://gerrproger.github.io/angular-bayan
 * Repo:     http://github.com/gerrproger/angular-bayan
 * Issues:   http://github.com/gerrproger/angular-bayan/issues
 */

'format amd';
(function (root) {
    'use strict';
    function factory(angular, Bayan) {
        return angular

            .module('angular-bayan', [])
            .directive('bayan', function () {
                return {
                    restrict: 'EA',
                    scope: true,
                    transclude: true,
                    replace: true,
                    template: '<div ng-transclude></div>',
                    controller: function () {
                        this.open = true;
                    },
                    controllerAs: 'bayan'
                };
            })
            .directive('bayanContent', ['$timeout', function ($timeout) {
                return {
                    restrict: 'EA',
                    transclude: true,
                    replace: true,
                    require: '^bayan',
                    scope: {
                        bayanContentOffset: '=',
                        bayanContentCollapsed: '='
                    },
                    template: '<div ng-transclude></div>',
                    link: function ($scope, element, attrs, controller) {
                        var expandedHeight = element[0].scrollHeight;
                        var collapsedHeight;

                        controller.open = !$scope.bayanContentCollapsed;
                        controller.update = function () {
                            $timeout(resize);
                        };

                        function checkHeight() {
                            var newEl = element[0].querySelector('[bayan-content-target],[data-bayan-content-target]');
                            if (newEl) {
                                element = angular.element(newEl);
                            }

                            var children = element.children();
                            var offset = 0;
                            var maxHeight = 0;

                            expandedHeight = element[0].scrollHeight;

                            angular.forEach(children, function (el, i) {
                                el = angular.element(el);

                                if (i === 0) {
                                    offset = el.prop('offsetTop');
                                    maxHeight = el.prop('offsetHeight');

                                } else {
                                    if (offset === el.prop('offsetTop')) {
                                        var h = el.prop('offsetHeight');
                                        if (h > maxHeight) {
                                            maxHeight = h;
                                        }

                                    } else {
                                        return false;
                                    }
                                }
                            });

                            collapsedHeight = maxHeight;
                        }

                        function resize() {
                            checkHeight();

                            if (controller.open) {
                                element.css({'max-height': expandedHeight + 'px'});
                            } else {
                                element.css({'max-height': collapsedHeight + parseInt($scope.bayanContentOffset) + 'px'});
                            }
                        }

                        $scope.$on('bayan:update', controller.update);

                        controller.update();

                        $scope.bayan = controller;
                    }
                };
            }])
            .directive('bayanHeader', function () {
                return {
                    restrict: 'EA',
                    transclude: true,
                    template: '<a href ng-click="toggleOpen()" ng-transclude></a>',
                    replace: true,
                    require: '^bayan',
                    link: function ($scope, element, attrs, controller) {
                        $scope.toggleOpen = function () {
                            controller.open = !controller.open;
                            controller.update();
                        };

                        $scope.bayan = controller;
                    }
                };
            });
    }

    if ((typeof module === 'object') && module.exports) {
        module.exports = factory(require('angular'));
    } else if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else {
        factory(root.angular, root.Bayan);
    }
}(this));
