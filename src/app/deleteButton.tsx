"use client";

import { useFormStatus } from "react-dom";

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition-colors w-full ${
        pending ? "opacity-50" : ""
      }`}
      disabled={pending}
    >
      {pending ? "Deleting order..." : "Delete order"}
    </button>
  );
}
