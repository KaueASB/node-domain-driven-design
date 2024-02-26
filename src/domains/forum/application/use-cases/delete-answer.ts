import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface DeleteAnswersUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswersUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DeleteAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswersUseCaseRequest): Promise<DeleteAnswersUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError('Answer not found'))
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError('You can only delete your own answers.'))
    }

    await this.answersRepository.delete(answer)

    return right({})
  }
}
