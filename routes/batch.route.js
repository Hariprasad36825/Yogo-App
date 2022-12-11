import { Router } from 'express'
import {
  GetBatchesController,
  insertBatchesController,
  updateBatchController
} from '../controller/batch.controllers'
import { isAuthorised } from '../middleware/auth.middleware'
import catchAsyncError from '../utils/catchAsyncError'

export const batchRouter = Router()

batchRouter.get('/', isAuthorised(), (req, res, next) =>
  catchAsyncError(GetBatchesController, req, res, next)
)

batchRouter.post('/', isAuthorised(), (req, res, next) =>
  catchAsyncError(insertBatchesController, req, res, next)
)

batchRouter.put('/', isAuthorised(), (req, res, next) =>
  catchAsyncError(updateBatchController, req, res, next)
)
