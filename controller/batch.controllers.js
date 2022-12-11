import { BatchMessage, wrapper } from "../Responses"
import { createBatch, getBatches, UpdateBatch } from "../services/batch.services"
import { ACCEPTED, CREATION_SUCCESSFULL, OK } from "../statusCodes"

export const GetBatchesController = async (req, res) => {
  res.status(OK).send(await getBatches())
}

export const insertBatchesController = async (req, res) => {
  const timing = req.body.timing
  await createBatch(timing)
  res.status(CREATION_SUCCESSFULL).send(wrapper(BatchMessage.inserted))
}

export const updateBatchController = async (req, res) => {
  const { id, timing } = req.body
  await UpdateBatch(id, timing)
  res.status(ACCEPTED).send(wrapper(BatchMessage.updated))
}