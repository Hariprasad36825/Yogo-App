import { Enrollment } from '../models/enrollment.model'

export const createEnrollment = async (user, batch, paid, duration) => {
  await Enrollment.create({ user, batch, paid, duration })
}

export const updateEnrollment = async (id, paid) => {
  await Enrollment.update({ paid }, { where: { id } })
}

export const getEnrollments = async (user, duration) => {
  return await Enrollment.findAll({ where: { user, duration } })
}
