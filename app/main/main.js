var app;
(function (app) {
    var main;
    (function (main) {
        'use strict';
        var MainController = (function () {
            function MainController(PizzaService, ToppingService) {
                var _this = this;
                this.PizzaService = PizzaService;
                this.ToppingService = ToppingService;
                this.itemsPerPage = 15;
                this.pizzaPageNumber = 1;
                this.toppingsPageNumber = 1;
                this.newTopping = "";
                this.errors = {};
                this.PizzaService.fetchPizzas().then(function () {
                    _this.paginatePizzas();
                }, function () {
                    console.log('Error fetching pizzas');
                });
                this.ToppingService.fetchToppings().then(function () {
                    _this.paginateToppings();
                }, function () {
                    console.log('Error fetching pizzas');
                });
            }
            MainController.prototype.paginatePizzas = function () {
                this.paginatedPizzas = [];
                var lastIndex = this.pizzaPageNumber * this.itemsPerPage;
                for (var i = lastIndex - this.itemsPerPage; i < lastIndex; i++) {
                    if (i >= this.PizzaService.pizzas.length)
                        break;
                    this.paginatedPizzas.push(this.PizzaService.pizzas[i]);
                }
            };
            MainController.prototype.paginateToppings = function () {
                this.paginatedToppings = [];
                var lastIndex = this.toppingsPageNumber * this.itemsPerPage;
                for (var i = lastIndex - this.itemsPerPage; i < lastIndex; i++) {
                    if (i >= this.ToppingService.toppings.length)
                        break;
                    this.paginatedToppings.push(this.ToppingService.toppings[i]);
                }
            };
            MainController.prototype.createTopping = function () {
                var _this = this;
                if (this.newTopping && this.newTopping.trim() != "") {
                    this.errors['toppingName'] = null;
                    var promise = this.ToppingService.createTopping(this.newTopping);
                    promise.then(function () {
                        _this.toppingSaved = true;
                        _this.toppingsPageNumber = _this.totalToppingPages();
                        _this.paginateToppings();
                    }, function () {
                        _this.errors['toppingName'] = "There was an error saving the topping.";
                    });
                }
                else {
                    this.errors['toppingName'] = "You must enter a name for the topping.";
                }
            };
            MainController.prototype.totalPizzaPages = function () {
                return Math.ceil(this.PizzaService.pizzas.length / this.itemsPerPage);
            };
            MainController.prototype.totalToppingPages = function () {
                return Math.ceil(this.ToppingService.toppings.length / this.itemsPerPage);
            };
            MainController.$inject = ['PizzaService', 'ToppingService'];
            return MainController;
        }());
        angular.module('pizzaClient').controller('MainController', MainController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=main.js.map