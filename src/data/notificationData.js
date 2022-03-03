import { faker } from '@faker-js/faker';
import { set, sub} from 'date-fns';


export const NOTIFICATIONS = [
    {
      id: faker.datatype.uuid(),
      title: 'Your order is placed',
      description: 'waiting for shipping',
      type: 'order_placed',
      createdAt: set(new Date(), { hours: 10, minutes: 30 }),
      isUnRead: true
    },
    {
      id: faker.datatype.uuid(),
      title: faker.name.findName(),
      description: 'answered to your comment on the Minimal',
      type: 'friend_interactive',
      createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
      isUnRead: true
    },
    {
      id: faker.datatype.uuid(),
      title: 'You have new message',
      description: '5 unread messages',
      type: 'chat_message',
      createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
      isUnRead: false
    },
    {
      id: faker.datatype.uuid(),
      title: 'You have new mail',
      description: 'sent from Guido Padberg',
      type: 'mail',
      createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
      isUnRead: false
    },
    {
      id: faker.datatype.uuid(),
      title: 'Delivery processing',
      description: 'Your order is being shipped',
      type: 'order_shipped',
      createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
      isUnRead: false
    }
  ];