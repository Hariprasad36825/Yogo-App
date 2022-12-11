import { EnrollmentMessage, wrapper } from "../Responses"
import { createEnrollment, getEnrollments, updateEnrollment } from "../services/enrollment.services"
import { ACCEPTED, CREATION_SUCCESSFULL, OK } from "../statusCodes"

export const createEnrollmentController = async (req, res) => {
  const user = req.user.id
  const { batch, paid, month, year } = req.body
  const duration = `${month} ${year}`

  await createEnrollment(user, batch, paid, duration)

  res.status(CREATION_SUCCESSFULL).send(wrapper(EnrollmentMessage.inserted))
}

export const updateEnrollmentController = async (req, res) => {
  const { id, paid } = req.body
  await updateEnrollment(id, paid)
  res.status(ACCEPTED).send(wrapper(EnrollmentMessage.updated))
}

export const getEnrollmentUser = async (req, res) => {
  const user = req.user.id
  const { month, year } = req.params
  const duration = `${month} ${year}`
  res.status(OK).send(await getEnrollments(user, duration))
}