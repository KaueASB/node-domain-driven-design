/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
}

test('create a answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'nova resposta',
  })

  expect(answer.content).toEqual('nova resposta')
  expect(answer.id).toBeDefined()
})
