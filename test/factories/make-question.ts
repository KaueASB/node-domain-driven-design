import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domains/forum/enterprise/entities/question'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: 'Example',
    content: 'Example',
    ...override,
  })

  return question
}
