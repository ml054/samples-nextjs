"use client";

import { useFormStatus } from "react-dom";

export default function AddOrderButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`add-button ${pending ? "opacity-50" : ""}`}
      disabled={pending}
    >
      {pending ? "Adding order..." : "Add order"}
    </button>
  );
}
