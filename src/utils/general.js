import logger from '../../libs/logger'

export const generateNumber = () => Math.floor(Math.random() * (100000 - 0 + 1) + 10)

export const cLog = (data) => logger.debug(JSON.stringify(data, null, 4))
