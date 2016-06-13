module app.service {
    import IResourceService = angular.resource.IResourceService;
    import IResourceClass = angular.resource.IResourceClass;
    import IResource = angular.resource.IResource;
    import IPizzaItem = app.entity.IPizzaItem;
    import PizzaItem = app.entity.PizzaItem;
    import IResourceArray = angular.resource.IResourceArray;
    import IToppingItem = app.entity.IToppingItem;
    import IPromise = angular.IPromise;
    import IHttpPromise = angular.IHttpPromise;
    import IQService = angular.IQService;

    export interface IPizzaService {
        pizzas:IPizzaItem[];
        getToppings(pizza:IPizzaItem):void;
        fetchPizzas():IPromise<any>;
    }

    interface IPizzaResource extends IResource<IPizzaItem> {}

    class PizzaService implements IPizzaService {

        private PizzaResource:IResourceClass<IPizzaResource>;
        pizzas:IPizzaItem[];

        static $inject = ['$resource', '$q'];

        constructor($resource:IResourceService, private $q:IQService) {
            this.PizzaResource = $resource("https://pizzaserver.herokuapp.com/pizzas/:id/:toppings", {id: '@id'});
        }

        fetchPizzas():IPromise<any> {
            var deferred = this.$q.defer();
            
            this.PizzaResource.query({}).$promise.then(
                (data) => {
                    this.pizzas = <any>data;
                    deferred.resolve();
                },
                (error) => {
                    console.log(error);
                    deferred.reject();
                }
            );
            
            return deferred.promise;
        }

        getToppings(pizza:IPizzaItem):void {
            this.PizzaResource.query({id: pizza.id, toppings: 'toppings'}).$promise.then(
                (data) => {
                    pizza.toppings = <any>data;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    angular.module('pizzaClient').service('PizzaService', PizzaService);
}