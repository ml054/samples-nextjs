"use server";

import { revalidatePath } from "next/cache";
import { BeerOrder } from "../db/models";
import { store } from "../db/store";

export async function addOrderAction(formData: FormData) {
  const beerType = String(formData.get("beerType"));
  const liters = Number(formData.get("liters"));

  const session = store.openSession();

  await session.store<BeerOrder>(new BeerOrder(null, beerType, liters));
  await session.saveChanges();

  revalidatePath("/");
}

export async function deleteOrderAction(id: BeerOrder["id"]) {
  if (!id) {
    throw new Error("ID is required")
  };

  const session = store.openSession();

  await session.delete<BeerOrder>(id);
  await session.saveChanges();

  revalidatePath("/");
}

export async function toggleOrderAction(id: BeerOrder["id"]) {
  if (!id) {
    throw new Error("ID is required")
  };

  const session = store.openSession();

  const order = await session.load<BeerOrder>(id);
  if (!order) {
    throw new Error(`Order (${id}) not found`);
  }

  order.isDone = !order.isDone;
  await session.saveChanges();

  revalidatePath("/");
}
