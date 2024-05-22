"use client";

import { useFormStatus } from "react-dom";
import { BeerOrder } from "../db/models";

export default function ToggleOrderButton({ beerType, isDone }: Pick<BeerOrder, "beerType" | "isDone">) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      <span className={`${isDone ? "line-through" : ""} ${pending ? "text-gray-300" : ""}`}>
        {beerType}
      </span>
    </button>
  );
}
