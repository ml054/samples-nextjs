import { unstable_noStore as noStore } from "next/cache";
import { addOrderAction, deleteOrderAction, toggleOrderAction } from "./actions";
import { BeerOrder } from "../db/models";
import { store } from "../db/store";
import AddOrderButton from "./addOrderButton";
import DeleteButton from "./deleteButton";
import ToggleOrderButton from "./toggleOrderButton";

export default async function Home() {
  noStore();

  const beerOrders = await store
    .openSession()
    .query<BeerOrder>({ collection: "beerOrders" })
    .orderBy("createDate")
    .all();

  return (
    <main className="w-96 mx-auto p-4 mt-8 bg-gray-800 rounded-md">
      <h1 className="text-2xl font-bold text-white mb-4 text-center">Beer Order</h1>

      <form action={addOrderAction} className="flex flex-col gap-4 ">
        <label className="flex flex-col">
          Type
          <input type="text" name="beerType" required className="text-black p-1" />
        </label>
        <label className="flex flex-col">
          Liters
          <input type="number" name="liters" required min="1" className="text-black p-1 " />
        </label>

        <AddOrderButton />
      </form>

      {beerOrders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center bg-gray-700 p-2 rounded-md transition-colors hover:bg-gray-600 mt-4"
        >
          <div>
            <form action={toggleOrderAction.bind(null, order.id)}>
              <ToggleOrderButton beerType={order.beerType} isDone={order.isDone} />
            </form>
            <span className="text-gray-400">{order.liters} liters</span>
          </div>
          <form action={deleteOrderAction.bind(null, order.id)}>
            <DeleteButton />
          </form>
        </div>
      ))}
    </main>
  );
}
