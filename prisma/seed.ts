import { Prisma } from '@prisma/client';
import prisma from '../server/database/db';

const generateSeed = async () => {
  await prisma.users.createMany({
    data: [{
      fullName: 'Bethany Jones',
      email: 'betpetjones@gmail.com',
      googleId: 5367098365,
      twitterId: '',
      snapchatId: '',
      fbId: 'https://www.facebook.com/bethany.ann.jones',
      instaId: 'https://www.instagram.com/plucky.puck/',
    },
    ],
    skipDuplicates: true,
  });

  await prisma.artistFollowing.createMany({
    data: [{
      userId: 1,
      artistName: 'Beyoncé',
      bio: 'Beyoncé Giselle Knowles-Carter is an American singer, songwriter and actress. Beyoncé performed in various singing and dancing competitions as a child. She rose to fame in the late 1990s as the lead singer of Destiny\'s Child, one of the best-selling girl groups of all time. Beyoncé is often cited as an influence by other artists.\n\nBorn and raised in Houston, Texas, Beyoncé began performing in local competitions at age 7, eventually forming the group Girl\'s Tyme in 1990 with help from her parents. <a href=\"https://www.last.fm/music/+noredirect/Beyonc%C3%A9\">Read more on Last.fm</a>',
      ticketId: 'K8vZ9175rX7',
      youtube: 'https://www.youtube.com/user/beyonce',
      twitter: 'https://twitter.com/Beyonce',
      facebook: 'https://www.facebook.com/beyonce',
      instagram: 'https://www.instagram.com/beyonce/',
      itunes: 'https://itunes.apple.com/artist/id1419227',
      wiki: 'https://en.wikipedia.org/wiki/Beyonc%C3%A9',
      homepage: 'http://www.beyonce.com/',
      image: 'https://s1.ticketm.net/dam/a/7ce/49c8082f-fe10-43f3-be6e-a9c8a87807ce_655591_RETINA_LANDSCAPE_16_9.jpg'
    },
    {
      userId: 1,
      artistName: 'Adele',
      bio: 'Adele Laurie Blue Adkins (born May 5, 1988) is an English singer and songwriter. After graduating in arts from the BRIT School in 2006, Adele signed a record deal with XL Recordings. Her debut album, 19, was released in 2008 and spawned the UK top-five singles \"Chasing Pavements\" and \"Make You Feel My Love\". The album was certified 8× platinum in the UK and triple platinum in the US. Adele was honoured with the Brit Award for Rising Star as well as the Grammy Award for Best New Artist. <a href=\"https://www.last.fm/music/Adele\">Read more on Last.fm</a>',
      ticketId: 'K8vZ917Gku7',
      youtube: 'https://www.youtube.com/user/adelelondon',
      twitter: 'https://twitter.com/Adele',
      facebook: 'https://www.facebook.com/adele',
      instagram: 'https://www.instagram.com/adele',
      itunes: 'https://open.spotify.com/artist/4dpARuHxo51G3z768sgnrY',
      wiki: 'https://en.wikipedia.org/wiki/Adele',
      homepage: 'http://adele.com/',
      image: 'https://s1.ticketm.net/dam/a/755/b91aed75-2a53-4cfd-a0f3-8eddb6e1f755_1747231_CUSTOM.jpg'
    },
    {
      userId: 1,
      artistName: 'Lizzo',
      bio: 'Melissa Jefferson (born April 27, 1988 in Detroit, Michigan, U.S.), known professionally as Lizzo, is an American rapper and singer. She is a founding member of indie hip hop groups The Chalice, Grrrl Prty, The Clerb, Ellypseas, and Absynthe. Her debut album, Lizzobangers, was released in 2013. In 2015, she released her sophomore album, Big Grrrl Small World.\n\nBorn in Detroit in the late 80\'s, Lizzo spent much of her formative years in the church <a href=\"https://www.last.fm/music/Lizzo\">Read more on Last.fm</a>',
      ticketId: 'K8vZ9173ea7',
      youtube: 'https://www.youtube.com/channel/UCXVMHu5xDH1oOfUGvaLyjGg',
      twitter: 'https://twitter.com/lizzo',
      facebook: 'https://www.facebook.com/LizzoMusic',
      instagram: 'https://www.instagram.com/lizzobeeating/',
      itunes: 'https://open.spotify.com/artist/56oDRnqbIiwx4mymNEv7dS',
      wiki: 'https://en.wikipedia.org/wiki/Lizzo',
      homepage: 'https://www.lizzomusic.com/',
      image: 'https://i.scdn.co/image/ab6761610000e5eb0d66b3670294bf801847dae2'
    },
    {
      userId: 1,
      artistName: 'Muse',
      bio: 'Muse is an alternative rock band from Teignmouth, England, United Kingdom. The band consists of Matthew Bellamy on lead vocals, piano, keyboard and guitar, Chris Wolstenholme on backing vocals and bass guitar, and Dominic Howard on drums and percussion. They have been friends since their formation in early 1994 and changed band names a number of times (such as Gothic Plague and Rocket Baby Dolls) before adopting the name Muse.',
      ticketId: 'K8vZ9175E5V',
      youtube: 'https://www.youtube.com/user/muse',
      twitter: 'https://twitter.com/muse',
      facebook: 'https://www.facebook.com/muse',
      instagram: 'https://www.instagram.com/muse/',
      itunes: 'https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI',
      wiki: 'https://en.wikipedia.org/wiki/Muse_(band)',
      homepage: 'http://muse.mu/',
      image: 'https://s1.ticketm.net/dam/a/6e4/ee7b835f-6caf-48e7-9958-d766e0f656e4_1749681_RETINA_PORTRAIT_3_2.jpg'
    }
    ],
    skipDuplicates: true,
  });

  await prisma.userEvents.createMany({
    data: [{
      userId: 1,
      eventAPIid: 'G5e0Z9CTkwvm8',
    },
    {
      userId: 1,
      eventAPIid: 'vvG1FZ9Cz0XZJe',
    },
    {
      userId: 1,
      eventAPIid: 'KovZpZAEvtFA',
    },
    {
      userId: 1,
      eventAPIid: 'K8vZ917_sF7',
    },
    {
      userId: 1,
      eventAPIid: 'rZ7HnEZ1A3aOaA',
    },
    ],
    skipDuplicates: true,
  });
};

generateSeed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
