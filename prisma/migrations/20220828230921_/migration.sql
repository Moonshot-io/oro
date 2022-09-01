-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEvents" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "eventAPIid" TEXT NOT NULL,

    CONSTRAINT "UserEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "profileURL" TEXT,
    "email" TEXT NOT NULL,
    "fbId" TEXT,
    "instaId" TEXT,
    "twitterId" TEXT,
    "snapchatId" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistUsersJoin" (
    "userId" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "ArtistUsersJoin_pkey" PRIMARY KEY ("userId","artistId")
);

-- CreateTable
CREATE TABLE "ArtistFollowing" (
    "id" SERIAL NOT NULL,
    "artistName" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "itunes" TEXT NOT NULL,
    "wiki" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "ArtistFollowing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPhotos" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "photoUrl" TEXT NOT NULL,
    "eventAPIid" TEXT NOT NULL,
    "deleteToken" TEXT,
    "caption" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "edited" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "Tickets" INTEGER NOT NULL,
    "Food" INTEGER NOT NULL,
    "Drinks" INTEGER NOT NULL,
    "Parking" INTEGER NOT NULL,
    "Merch" INTEGER NOT NULL,
    "Travel" INTEGER NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventBudgets" (
    "eventId" INTEGER NOT NULL,
    "budgetId" INTEGER NOT NULL,

    CONSTRAINT "EventBudgets_pkey" PRIMARY KEY ("eventId","budgetId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_fbId_key" ON "Users"("fbId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_instaId_key" ON "Users"("instaId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_twitterId_key" ON "Users"("twitterId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_snapchatId_key" ON "Users"("snapchatId");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistFollowing_artistName_key" ON "ArtistFollowing"("artistName");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvents" ADD CONSTRAINT "UserEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistUsersJoin" ADD CONSTRAINT "ArtistUsersJoin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistUsersJoin" ADD CONSTRAINT "ArtistUsersJoin_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "ArtistFollowing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPhotos" ADD CONSTRAINT "EventPhotos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBudgets" ADD CONSTRAINT "EventBudgets_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "UserEvents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBudgets" ADD CONSTRAINT "EventBudgets_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
