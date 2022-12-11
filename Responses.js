export const wrapper = (message) => ({ message: [{ message }] })

export const userError = {
  exists: 'Email already exists',
  invalid: 'Invalid Credentials',
  notDefined: 'User not defined',
  InvalidAccount: 'Invalid User contact administrator'
}
export const userMessage = {
  inserted: 'User Inserted successfully',
  success: 'login success'
}

export const BatchMessage = {
  inserted: 'Batch created Successfully',
  updated: 'Batch updated Successfully'
}

export const EnrollmentMessage = {
  inserted: 'Enrolled Successfully',
  updated: 'Enrollment updated'
}

export const tokenError = {
  notFound: 'No token, authorization denied',
  invalid: 'Token is not valid',
  expired: 'Token expired',
  notAuthorised: "you don't have previleges to perform operation"
}

export const CommonError = {
  ContactAdmin: 'something went wrong, contact admin'
}
