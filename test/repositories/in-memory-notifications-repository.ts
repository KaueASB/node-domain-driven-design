import { NotificationsRepository } from '@/domains/notification/application/repositories/notifications-repository'
import { Notification } from '@/domains/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
