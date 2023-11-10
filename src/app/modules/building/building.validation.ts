import { z } from "zod";

const createRoom = z.object({
  body: z.object({
    title:z.string({required_error:'title is required'}),
  })
})
const updateRoom = z.object({
  body: z.object({
    title:z.string().optional()
  })
})
export const BuildingZodValidation = {
  createRoom,
  updateRoom
}