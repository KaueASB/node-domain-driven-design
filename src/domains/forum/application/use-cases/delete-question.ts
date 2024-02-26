import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

interface DeleteQuestionsUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionsUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DeleteQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionsUseCaseRequest): Promise<DeleteQuestionsUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError('Question not found.'))
    }

    if (authorId !== question.authorId.toString()) {
      return left(
        new NotAllowedError('You can only delete your own questions.'),
      )
    }

    await this.questionsRepository.delete(question)

    return right({})
  }
}
