"use client";

import { useFormStatus } from "react-dom";

export default function AddOrderButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors w-full ${
        pending ? "opacity-50" : ""
      }`}
      disabled={pending}
    >
      {pending ? "Adding order..." : "Add order"}
    </button>
  );
}
