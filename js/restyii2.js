angular.module('restyii2', ['ngResource']).
        factory('Project', function ($resource) {
            var Project = $resource('https://basic-anthony-zimer-5.c9.io/web/index.php/posts/:id',
                    null,
                    {'update': {method: 'PUT'}}
            );
            return Project;
        });
