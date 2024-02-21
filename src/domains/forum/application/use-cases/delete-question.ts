import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionsUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionsUseCaseResponse {}

export class DeleteQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionsUseCaseRequest): Promise<DeleteQuestionsUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('You can only delete your own questions.')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
