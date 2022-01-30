const { env } = process

export const mailerINFO = {
  service: env.NODEMAILER_SERVICE,
  user: env.NODEMAILER_USER,
  pass: env.NODEMAILER_PASS,
  from: env.NODEMAILER_USER,
  to: env.NODEMAILER_TO,
}
