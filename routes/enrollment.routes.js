import { Router } from 'express'
import {
  createEnrollmentController,
  getEnrollmentUser,
  updateEnrollmentController
} from '../controller/enrollment.controllers'
import { isAuthorised } from '../middleware/auth.middleware'
import catchAsyncError from '../utils/catchAsyncError'

export const EnrollmentRouter = Router()

EnrollmentRouter.get('/:month/:year', isAuthorised(), (req, res, next) =>
  catchAsyncError(getEnrollmentUser, req, res, next)
)

EnrollmentRouter.post('/', isAuthorised(), (req, res, next) =>
  catchAsyncError(createEnrollmentController, req, res, next)
)

EnrollmentRouter.put('/', isAuthorised(), (req, res, next) =>
  catchAsyncError(updateEnrollmentController, req, res, next)
)
