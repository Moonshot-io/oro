import prisma from '../db';

const createMany = await prisma.users.createMany({
  data: [{
    fullName: 'Bethany Jones',
    email: 'betpetjones@gmail.com',
    fbId: 'https://www.facebook.com/bethany.ann.jones',
    instaId: 'https://www.instagram.com/plucky.puck/',
  },
  ]
});
