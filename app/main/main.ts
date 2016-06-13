module app.main {
    'use strict';
    import IPizzaService = app.service.IPizzaService;
    import IPizzaItem = app.entity.IPizzaItem;
    import IToppingService = app.service.IToppingService;
    import IToppingItem = app.entity.IToppingItem;

    class MainController {

        private paginatedPizzas:IPizzaItem[];
        private paginatedToppings:IToppingItem[];
        private itemsPerPage = 15;
        private pizzaPageNumber:number;
        private toppingsPageNumber:number;
        private newTopping:string;

        static $inject = ['PizzaService', 'ToppingService']
        constructor(private PizzaService:IPizzaService, private ToppingService:IToppingService) {
            this.pizzaPageNumber = 1;
            this.toppingsPageNumber = 1;
            this.newTopping = "";
            
            this.PizzaService.fetchPizzas().then(
                () => {
                    this.paginatePizzas();
                },
                () => {
                    console.log('Error fetching pizzas');
                }
            );
            
            this.ToppingService.fetchToppings().then(
                () => {
                    this.paginateToppings();
                },
                () => {
                    console.log('Error fetching pizzas');
                }
            );
        }

        paginatePizzas():void{
            this.paginatedPizzas = [];
            
            var lastIndex = this.pizzaPageNumber * this.itemsPerPage;
            
            for(var i = lastIndex - this.itemsPerPage; i < lastIndex; i++){
                if(i >= this.PizzaService.pizzas.length)
                    break;
                
                this.paginatedPizzas.push(this.PizzaService.pizzas[i]);
            }
        }

        paginateToppings():void{
            this.paginatedToppings = [];

            var lastIndex = this.toppingsPageNumber * this.itemsPerPage;

            for(var i = lastIndex - this.itemsPerPage; i < lastIndex; i++){
                if(i >= this.ToppingService.toppings.length)
                    break;

                this.paginatedToppings.push(this.ToppingService.toppings[i]);
            }
        }

        createTopping():void{
            if(this.newTopping && this.newTopping.trim() != ""){
                
            }
            else{
                alert("You must enter a name for the topping.")
            }
        }
    }

    angular.module('pizzaClient').controller('MainController', MainController);
}