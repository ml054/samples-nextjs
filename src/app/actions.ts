"use server";

import { revalidatePath } from "next/cache";
import { BeerOrder, Entity } from "../db/models";
import { store } from "../db/store";

export async function addOrderAction(formData: FormData) {
  const beerType = formData.get("beerType") as string;
  const liters = Number(formData.get("liters"));

  const session = store.openSession();

  await session.store<BeerOrder>({
    id: "",
    collection: "beerOrders",
    beerType,
    liters,
    isDone: false,
    createDate: new Date(),
  });
  await session.saveChanges();

  session.dispose();
  revalidatePath("/");
}

export async function deleteOrderAction(id: Entity["id"]) {
  const session = store.openSession();

  await session.delete<BeerOrder>(id);
  await session.saveChanges();

  session.dispose();
  revalidatePath("/");
}

export async function toggleOrderAction(id: Entity["id"]) {
  const session = store.openSession();

  const order = await session.load<BeerOrder>(id);
  if (!order) {
    throw new Error(`Order (${id}) not found`);
  }

  order.isDone = !order.isDone;
  await session.saveChanges();

  session.dispose();
  revalidatePath("/");
}
