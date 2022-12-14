import { Op } from 'sequelize'
import { Batch } from '../models/batch.model'
import { Enrollment } from '../models/enrollment.model'
export const createEnrollment = async (user, batch, paid, duration) => {
  await Enrollment.create({ user, batch, paid, duration })
}

export const updateEnrollment = async (id, paid, batch) => {
  await Enrollment.update({ paid, batch }, { where: { id } })
}

export const getEnrollments = async (user, duration) => {
  return await Enrollment.findAll({
    where: { user, [Op.or]: { duration, paid: false } },
    include: {
      model: Batch,
      attributes: ['id', 'timing', 'fee']
    },
    attributes: ['id', 'batch', 'paid', 'duration']
  })
}
