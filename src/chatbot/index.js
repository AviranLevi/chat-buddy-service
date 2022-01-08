import { dockStart } from '@nlpjs/basic'

export const addNewAnswer = async (question, answer) => {
  const dock = await dockStart()
}

export const getAnswer = async (message) => {
  const dock = await dockStart()
  const nlp = dock.get('nlp')
  await nlp.train()
  const response = await nlp.process('en', message)
  return response
}
