import { QuestionCommentsRepository } from '@/domains/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domains/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
