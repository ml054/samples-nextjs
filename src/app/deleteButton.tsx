"use client";

import { useFormStatus } from "react-dom";

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`delete-button ${pending ? "opacity-50" : ""}`}
      disabled={pending}
    >
      {pending ? "Deleting order..." : "Delete order"}
    </button>
  );
}
