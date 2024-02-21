import { QuestionsRepository } from '@/domains/forum/application/repositories/questions-repository'
import { Question } from '@/domains/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }
}
