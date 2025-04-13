export interface ISeeder<T> {

    generatedEntitiesMapping : Map<number, T>;
    generate() : void;
    insert() : Promise<void>;

}