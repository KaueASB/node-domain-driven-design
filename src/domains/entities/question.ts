import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"

export interface QuestionProps {
  authorId: UniqueEntityId
  title: string
  content: string
  slug: Slug
}

export class Question extends Entity<QuestionProps> {

}
