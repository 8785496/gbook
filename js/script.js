angular.module('project', ['ngRoute', 'restyii2'])

        .config(function ($routeProvider) {
            $routeProvider
                    .when('/', {
                        controller: 'ListCtrl',
                        templateUrl: 'list.html'
                    })
                    .when('/edit/:projectId', {
                        controller: 'EditCtrl',
                        templateUrl: 'detail.html'
                    })
                    .when('/page/:projectPage', {
                        controller: 'ListCtrl',
                        templateUrl: 'list.html'
                    })
                    .when('/about', {
                        templateUrl: 'about.html'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        })

        .controller('ListCtrl', function ($scope, $location, $routeParams, $templateCache, Project) {
            $templateCache.remove($location.absUrl());
            $scope.projects = Project.query({page: $routeParams.projectPage}, function (u, getResponseHeaders) {
                $scope.currentPage = parseInt(getResponseHeaders('x-pagination-current-page'));
                $scope.pageCount = parseInt(getResponseHeaders('x-pagination-page-count'));
                $scope.pagePrev = ($scope.currentPage > 1) ? ($scope.currentPage-1) : $scope.currentPage;
                $scope.pageNext = ($scope.currentPage < $scope.pageCount) ? ($scope.currentPage+1) : $scope.currentPage;
                $scope.isPrev = ($scope.pagePrev===$scope.currentPage) ? "disabled" : null;
                $scope.isNext = ($scope.pageNext===$scope.currentPage) ? "disabled" : null;
            });
            
            $scope.isUpdate = function(post) {
                return (post.time_create === post.time_update) ? true : false;
            }
            
            $scope.note = new Project();

            $scope.create = function () {
                $scope.note.$save(function () {
                    $scope.note = new Project();
                    $scope.projects = Project.query({page: $routeParams.projectPage});
                });
            };
        })

        .controller('EditCtrl',
                function ($scope, $location, $routeParams, Project) {
                    var self = this;

                    Project.get({id: $routeParams.projectId}, 
                        function (project) {
                            self.original = project;
                            $scope.project = new Project(self.original);
                        },
                        function() {
                            $location.path('/');
                        }
                    );

                    $scope.isClean = function () {
                        return angular.equals(self.original, $scope.project);
                    }

                    $scope.delete = function () {
                        Project.delete({id: $scope.project.id}, null, function () {
                            $location.path('/');
                        });
                    };

                    $scope.update = function () {
                        var post = $scope.project;
                        Project.update({id: post.id}, post, function () {
                            $location.path('/');
                        });
                    };
                });

//Connection:Keep-Alive
//Content-Length:840
//Content-Type:application/json; charset=UTF-8
//Date:Mon, 05 Jan 2015 13:48:21 GMT
//Keep-Alive:timeout=5, max=100
//Link:<http://localhost/basic/web/index.php/posts?page=1>; rel=self
//Server:Apache/2.4.9 (Win32) OpenSSL/1.0.1g PHP/5.5.11
//X-Pagination-Current-Page:1
//X-Pagination-Page-Count:1
//X-Pagination-Per-Page:20
//X-Pagination-Total-Count:14
//X-Powered-By:PHP/5.5.11

