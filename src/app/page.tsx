import { unstable_noStore as noStore } from "next/cache";
import { addOrderAction, deleteOrderAction, toggleOrderAction } from "./actions";
import { BeerOrder } from "../db/models";
import { store } from "../db/store";
import AddOrderButton from "./addOrderButton";
import DeleteButton from "./deleteButton";
import ToggleOrderButton from "./toggleOrderButton";
import "./page.css";

export default async function Home() {
  noStore();

  const beerOrders = await store
    .openSession()
    .query<BeerOrder>({ collection: "BeerOrders" })
    .orderBy("createDate")
    .all();

  return (
    <main className="beer-order-page">
      <h1 className="title">Beer Order</h1>

      <form action={addOrderAction} className="add-form">
        <label>
          Type
          <input type="text" name="beerType" required />
        </label>
        <label>
          Liters
          <input type="number" name="liters" required min="1" />
        </label>

        <AddOrderButton />
      </form>

      {beerOrders.map((order) => (
        <div key={order.id} className="order-item">
          <div>
            <form action={toggleOrderAction.bind(null, order.id)}>
              <ToggleOrderButton beerType={order.beerType} isDone={order.isDone} />
            </form>
            <span className="liters-text">{order.liters} liters</span>
          </div>
          <form action={deleteOrderAction.bind(null, order.id)}>
            <DeleteButton />
          </form>
        </div>
      ))}
    </main>
  );
}
