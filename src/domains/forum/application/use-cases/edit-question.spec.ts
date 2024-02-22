import { EditQuestionsUseCase } from './edit-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionsUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question by id', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)

    const { question } = await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toValue(),
      title: 'title edited',
      content: 'content edited',
    })

    expect(question).toMatchObject({
      title: 'title edited',
      content: 'content edited',
      updatedAt: expect.any(Date),
    })
  })

  it('should not be able to edit a question from another author', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)

    await expect(() =>
      sut.execute({
        authorId: 'another-author',
        questionId: newQuestion.id.toValue(),
        title: 'title edited',
        content: 'content edited',
      }),
    ).rejects.toThrowError('You can only edit your own questions.')
  })
})
