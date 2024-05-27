import { DocumentStore } from "ravendb";

// Change it to your url and database name
const store = new DocumentStore("http://live-test.ravendb.net", "beer-order-database");
store.initialize();

export { store };
