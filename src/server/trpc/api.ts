"use client";

import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "./index";

export const api = createTRPCReact<AppRouter>();
