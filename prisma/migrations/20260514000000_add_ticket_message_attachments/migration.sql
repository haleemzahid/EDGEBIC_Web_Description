-- CreateTable
CREATE TABLE "ContactTicketMessageAttachment" (
    "id" UUID NOT NULL,
    "messageId" UUID NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "storedName" VARCHAR(255) NOT NULL,
    "mimeType" VARCHAR(255) NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_ContactTicketMessageAttachment" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IX_ContactTicketMessageAttachment_messageId" ON "ContactTicketMessageAttachment"("messageId");

-- AddForeignKey
ALTER TABLE "ContactTicketMessageAttachment" ADD CONSTRAINT "ContactTicketMessageAttachment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ContactTicketMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
