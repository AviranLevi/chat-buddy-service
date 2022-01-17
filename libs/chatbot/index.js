import { dockStart } from '@nlpjs/basic'
import logger from '../logger'

export const getAnswer = async (message) => {
  const dock = await dockStart()
  const nlp = dock.get('nlp')
  await nlp.train()
  const response = await nlp.process('en', message)
  logger.debug(JSON.stringify(response, null, 4))
  return response
}
