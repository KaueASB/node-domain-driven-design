import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create a answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'nova resposta'
  })

  expect(answer.content).toEqual('nova resposta')
  expect(answer.id).toBeDefined()
})