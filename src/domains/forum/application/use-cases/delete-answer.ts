import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswersUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswersUseCaseResponse {}

export class DeleteAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswersUseCaseRequest): Promise<DeleteAnswersUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('You can only delete your own answers.')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
