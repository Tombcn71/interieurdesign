"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("8f129ed6-1395-4c84-a139-9ba79e2338ab");
  }, []);

  return null;
};
