var app;
(function (app) {
    var service;
    (function (service) {
        var ToppingService = (function () {
            function ToppingService($resource, $q) {
                this.$q = $q;
                this.ToppingResource = $resource("https://pizzaserver.herokuapp.com/toppings");
            }
            ToppingService.prototype.fetchToppings = function () {
                var _this = this;
                var deferred = this.$q.defer();
                this.ToppingResource.query({}).$promise.then(function (data) {
                    _this.toppings = data;
                    console.log(_this.toppings);
                    deferred.resolve();
                }, function (error) {
                    console.log(error);
                    deferred.reject();
                });
                return deferred.promise;
            };
            ToppingService.prototype.createTopping = function (topping) {
            };
            ToppingService.$inject = ['$resource', '$q'];
            return ToppingService;
        }());
        angular.module('pizzaClient').service('ToppingService', ToppingService);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));
//# sourceMappingURL=ToppingService.js.map