import { AnswerCommentsRepository } from '@/domains/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domains/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}
