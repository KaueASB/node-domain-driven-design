import { AnswersRepository } from '@/domains/forum/application/repositories/answers-repository'
import { Answer } from '@/domains/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(question: Answer) {
    this.items.push(question)
  }
}
