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

-- AddForeignKey
ALTER TABLE "EventBudgets" ADD CONSTRAINT "EventBudgets_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "UserEvents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBudgets" ADD CONSTRAINT "EventBudgets_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
