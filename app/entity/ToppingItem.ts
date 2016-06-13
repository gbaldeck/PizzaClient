module app.entity{
    export interface IToppingItem{
        id:String;
        name:String;
    }

    export class ToppingItem implements IToppingItem{
        id:String;
        name:String;
    }
}