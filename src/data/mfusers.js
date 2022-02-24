import { v4 as uuid } from 'uuid';
import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

export const mfusers = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),  name: faker.name.findName(),
  company: faker.company.companyName(),
  createdAt: 1555016400000,
  address: faker.address.streetAddress(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  phone: faker.phone.phoneNumber(),
  avatarUrl: faker.image.avatar(),
  email: 'ekaterina.tankova@devias.io',
  role: sample([
    'Customer',
    'Seller',
    'Designer',
  ])
}));


