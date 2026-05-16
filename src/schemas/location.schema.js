import { z } from "zod";

export const locationSchema = z.object({
  name: z.string().max(45).optional(),
  street_address: z.string().max(45).optional(),
  city: z.string().max(45).optional(),
  state: z.string().max(45).optional(),
  zip: z.string().max(45).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().max(255).optional(),
});
