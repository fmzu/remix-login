import { Hono } from "hono";

export const api = new Hono();

export type Api = typeof api;
