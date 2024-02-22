import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionsUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionsUseCaseResponse {}

export class EditQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionsUseCaseRequest): Promise<EditQuestionsUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('You can only edit your own questions.')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return {}
  }
}