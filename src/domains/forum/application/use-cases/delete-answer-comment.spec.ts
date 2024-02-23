import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to delete a answer comment by id', async () => {
    const newAnswerComment = makeAnswerComment()

    await inMemoryAnswerCommentRepository.create(newAnswerComment)

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(1)

    await sut.execute({
      authorId: newAnswerComment.authorId.toString(),
      answerCommentId: newAnswerComment.id.toString(),
    })

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer comment from another author', async () => {
    const newAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryAnswerCommentRepository.create(newAnswerComment)

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(1)

    await expect(() =>
      sut.execute({
        authorId: 'another-author',
        answerCommentId: newAnswerComment.id.toString(),
      }),
    ).rejects.toThrowError('You are not authorized to delete this comment')
  })
})
