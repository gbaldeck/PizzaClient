module app.entity{
    export interface IPizzaItem{
        id:String;
        name:String;
        description:String;
        toppings:IToppingItem[];
    }

    export class PizzaItem implements IPizzaItem{
        id:String;
        name:String;
        description:String;
        toppings:IToppingItem[];
    }
}
