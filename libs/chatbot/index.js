import { dockStart } from '@nlpjs/basic'

export const getAnswer = async (message) => {
  const dock = await dockStart()
  const nlp = dock.get('nlp')
  await nlp.train()
  const response = await nlp.process('en', message)
  return response
}
