import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete question comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to delete a question comment by id', async () => {
    const newQuestionComment = makeQuestionComment()

    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(1)

    await sut.execute({
      authorId: newQuestionComment.authorId.toString(),
      questionCommentId: newQuestionComment.id.toString(),
    })

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment from another author', async () => {
    const newQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(1)

    await expect(() =>
      sut.execute({
        authorId: 'another-author',
        questionCommentId: newQuestionComment.id.toString(),
      }),
    ).rejects.toThrowError('You are not authorized to delete this comment')
  })
})
