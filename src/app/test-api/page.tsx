"use client";
//THIRD PARTY MODULES
import axios from "axios";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function Page() {
  const { mutate, data } = useMutation({
    mutationFn: () =>
      axios.post("/api/proxy", {
        data: "data nè",
      }),
  });

  useEffect(() => {
    mutate();
  }, []);

  return <>{JSON.stringify(data?.data)}</>;
}
