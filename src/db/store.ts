import { DocumentStore } from "ravendb";

const store = new DocumentStore("http://live-test.ravendb.net", "beer-order-database");
store.conventions.findCollectionNameForObjectLiteral = (entity: any) => entity["collection"];
store.initialize();

export { store };
