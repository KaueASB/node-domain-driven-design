import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

describe('Domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscriber cadastrado (ouvindo o evento de "CustomAggregateCreated")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Criando um CustomAggregate, porém, SEM salvar no banco de dados
    const aggregate = CustomAggregate.create()

    // Marcando o aggregate para ser enviado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Enviando o evento para o subscriber
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    expect(callbackSpy).toHaveBeenCalledTimes(1)
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
