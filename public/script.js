// Instantiate the app, the 'myPortal' parameter must match what is in ng-app
var myPortal = angular.module('myPortal', ['ngResource', 'ngCookies']);

//Dev config
myPortal.constant('ENV_VARS', {
    baseUrl: '/api/',
    tokenAPI: 'tokens/'
});
//http://localhost:1337/api/ also works

myPortal.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);
// Create the controller, the 'CustAuth' parameter must match an ng-controller directive
myPortal.controller('CustAuth', function ($scope, $location, $window, $cookieStore, $resource, $http, ENV_VARS) {
     $scope.login = function () {
        // Call rest API to verify customer
        if (!$scope.PIN || $scope.PIN === '' || !$scope.screen_name || $scope.screen_name === '')
        { $scope.Dbg = "invld"; }
        else
        {
            var data = { "screen_name": "", "PIN_hash": "" };
            data.screen_name = $scope.screen_name;
            data.PIN_hash = myHash($scope.PIN);
           
            $http.post(ENV_VARS.baseUrl + ENV_VARS.tokenAPI,
                ';;;'+ data.screen_name + ';;;' + data.PIN_hash + ';;;',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }
            ).success(function (response) {                
                $scope.token = response.token;
                if (!$scope.token || $scope.token === '')
                    $scope.Dbg = "unauth";
                else {
                    $cookieStore.put('tkn', $scope.token);
                    $cookieStore.put('sn', $scope.screen_name);
                    window.location = $location.path() + "/Customer/Index.html";
                };
            }).error(function (response) {             
                $scope.Dbg = response;
            });   
           
        };
    }; 
    
});

myHash = function (pin) {    
    return pin;
    //not yet implemented;
};
angular.element(window.document.body).ready(function () {
    window.document.getElementById('tm').innerHTML = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
});



