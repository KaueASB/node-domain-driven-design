import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

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

    const result = await sut.execute({
      authorId: newQuestionComment.authorId.toString(),
      questionCommentId: newQuestionComment.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment from another author', async () => {
    const newQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(1)

    const result = await sut.execute({
      authorId: 'another-author',
      questionCommentId: newQuestionComment.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(result.value).toMatchObject({
      message: 'You are not authorized to delete this comment',
    })
  })
})
