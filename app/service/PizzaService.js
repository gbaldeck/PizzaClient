var app;
(function (app) {
    var service;
    (function (service) {
        var PizzaService = (function () {
            function PizzaService($resource, $q) {
                this.$q = $q;
                this.PizzaResource = $resource("https://pizzaserver.herokuapp.com/pizzas/:id/:toppings", { id: '@id' });
            }
            PizzaService.prototype.fetchPizzas = function () {
                var _this = this;
                var deferred = this.$q.defer();
                this.PizzaResource.query({}).$promise.then(function (data) {
                    _this.pizzas = data;
                    deferred.resolve();
                }, function (error) {
                    console.log(error);
                    deferred.reject();
                });
                return deferred.promise;
            };
            PizzaService.prototype.getToppings = function (pizza) {
                this.PizzaResource.query({ id: pizza.id, toppings: 'toppings' }).$promise.then(function (data) {
                    pizza.toppings = data;
                }, function (error) {
                    console.log(error);
                });
            };
            PizzaService.$inject = ['$resource', '$q'];
            return PizzaService;
        }());
        angular.module('pizzaClient').service('PizzaService', PizzaService);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));
//# sourceMappingURL=PizzaService.js.map