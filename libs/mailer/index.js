import nodemailer from 'nodemailer'
import { mailerINFO } from './config'

const { service, user, pass, from } = mailerINFO

const transporter = nodemailer.createTransport({
  service,
  host: 'smtp.gmail.com',
  auth: { user, pass },
  tls: { rejectUnauthorized: false },
})

export const sendMail = async (subject, text, to) => {
  try {
    const mailOptions = { from, to, subject, text }
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return { success: false, error }
      } else {
        return { success: true, message: 'Email sent!' }
      }
    })
  } catch (error) {
    throw error
  }
}
