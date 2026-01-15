"use client";
import { useMemo } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/redux/store";

export default function StoreProvider({ children }) {
  const store = useMemo(() => makeStore(), []);
  return <Provider store={store}>{children}</Provider>;
}
