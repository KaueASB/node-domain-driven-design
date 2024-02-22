import { EditAnswersUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswersUseCase

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer by id', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(inMemoryAnswersRepository.items).toHaveLength(1)

    const { answer } = await sut.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toValue(),

      content: 'content edited',
    })

    expect(answer).toMatchObject({
      content: 'content edited',
      updatedAt: expect.any(Date),
    })
  })

  it('should not be able to edit a answer from another author', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(inMemoryAnswersRepository.items).toHaveLength(1)

    await expect(() =>
      sut.execute({
        authorId: 'another-author',
        answerId: newAnswer.id.toValue(),
        content: 'content edited',
      }),
    ).rejects.toThrowError('You can only edit your own answers.')
  })
})
