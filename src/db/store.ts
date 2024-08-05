import { DocumentStore } from "ravendb";
import { BeerOrder } from "@/db/models";

// Change it to your url and database name
const store = new DocumentStore("http://live-test.ravendb.net", "beer-order-database");

// Avoid class name minification in production build
store.conventions.findCollectionName = constructorOrTypeChecker => {
    if (constructorOrTypeChecker === BeerOrder) {
        return "BeerOrders";
    }

    return constructorOrTypeChecker.name;
}

store.initialize();

export { store };
