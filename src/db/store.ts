import { DocumentStore } from "ravendb";

const store = new DocumentStore("http://live-test.ravendb.net", "beer-order-database");
store.initialize();

export { store };
