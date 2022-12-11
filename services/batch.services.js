import { Batch } from "../models/batch.model"

export const createBatch = async (timing) => {
  return await Batch.create({ timing })
}

export const UpdateBatch = async (id, timing) => {
  return await Batch.update({ timing }, { where: { id } })
}

export const getBatches = async () => {
  return await Batch.findAll()
}