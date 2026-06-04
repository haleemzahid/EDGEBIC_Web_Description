-- CreateEnum
CREATE TYPE "SoftwareStatus" AS ENUM ('upToDate', 'updateAvailable', 'needsAttention', 'trial', 'notInstalled');

-- CreateEnum
CREATE TYPE "EmailFolder" AS ENUM ('inbox', 'sent');

-- CreateEnum
CREATE TYPE "EmailSenderType" AS ENUM ('user', 'contact');

-- CreateEnum
CREATE TYPE "ContactPriority" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "ContactMeetingStatus" AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "ContactTaskCategory" AS ENUM ('sales', 'onboarding', 'support', 'followUp');

-- CreateEnum
CREATE TYPE "ContactTicketStatus" AS ENUM ('open', 'pending', 'resolved', 'closed');

-- CreateEnum
CREATE TYPE "ContactTicketActivityType" AS ENUM ('created', 'assigned', 'statusChanged', 'priorityChanged', 'replied', 'noteAdded');

-- CreateEnum
CREATE TYPE "TicketMessageSender" AS ENUM ('user', 'contact');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ContactTaskStatus" ADD VALUE 'inProgress';
ALTER TYPE "ContactTaskStatus" ADD VALUE 'cancelled';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'client';

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "company" VARCHAR(255),
ADD COLUMN     "country" VARCHAR(128),
ADD COLUMN     "jobTitle" VARCHAR(128),
ADD COLUMN     "lastContactedAt" TIMESTAMP(3),
ADD COLUMN     "lastContactedNote" VARCHAR(255),
ADD COLUMN     "lastMeetingAt" TIMESTAMP(3),
ADD COLUMN     "lastMeetingNote" VARCHAR(255),
ADD COLUMN     "leadSource" VARCHAR(255),
ADD COLUMN     "leadSourceDate" TIMESTAMP(3),
ADD COLUMN     "linkedIn" VARCHAR(2048),
ADD COLUMN     "stripeCustomerId" VARCHAR(255),
ADD COLUMN     "timezone" VARCHAR(64),
ADD COLUMN     "website" VARCHAR(2048);

-- AlterTable
ALTER TABLE "ContactNote" ADD COLUMN     "meetingId" UUID,
ADD COLUMN     "pinned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priority" "ContactPriority" NOT NULL DEFAULT 'medium';

-- AlterTable
ALTER TABLE "ContactTask" ADD COLUMN     "assigneeUserId" UUID,
ADD COLUMN     "category" "ContactTaskCategory",
ADD COLUMN     "meetingId" UUID,
ADD COLUMN     "priority" "ContactPriority" NOT NULL DEFAULT 'medium';

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "contactId" UUID,
ADD COLUMN     "type" VARCHAR(32);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contactId" UUID;

-- CreateTable
CREATE TABLE "ContactSoftware" (
    "id" UUID NOT NULL,
    "contactId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "installedVersion" VARCHAR(32),
    "latestVersion" VARCHAR(32),
    "installDate" TIMESTAMP(3),
    "status" "SoftwareStatus" NOT NULL DEFAULT 'upToDate',
    "githubUrl" VARCHAR(2048),
    "docsUrl" VARCHAR(2048),
    "downloadUrl" VARCHAR(2048),
    "licenseKey" VARCHAR(255),
    "licenseType" VARCHAR(128),
    "seats" INTEGER,
    "os" VARCHAR(128),
    "database" VARCHAR(128),
    "installPath" VARCHAR(512),
    "notes" VARCHAR(8000),
    "clientUnread" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_ContactSoftware" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftwareRelease" (
    "id" UUID NOT NULL,
    "product" VARCHAR(255) NOT NULL,
    "version" VARCHAR(64) NOT NULL,
    "releaseDate" DATE NOT NULL,
    "downloadUrl" VARCHAR(2048),
    "notes" VARCHAR(8000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_SoftwareRelease" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactEmailThread" (
    "id" UUID NOT NULL,
    "contactId" UUID NOT NULL,
    "folder" "EmailFolder" NOT NULL,
    "subject" VARCHAR(500) NOT NULL,
    "preview" VARCHAR(500) NOT NULL,
    "unread" BOOLEAN NOT NULL DEFAULT false,
    "clientDeleted" BOOLEAN NOT NULL DEFAULT false,
    "teamDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_ContactEmailThread" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactEmailMessage" (
    "id" UUID NOT NULL,
    "threadId" UUID NOT NULL,
    "senderType" "EmailSenderType" NOT NULL,
    "senderUserId" UUID,
    "senderName" VARCHAR(255) NOT NULL,
    "senderEmail" VARCHAR(255),
    "recipientName" VARCHAR(255),
    "recipientEmail" VARCHAR(255),
    "body" VARCHAR(20000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_ContactEmailMessage" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactEmailMessageAttachment" (
    "id" UUID NOT NULL,
    "messageId" UUID NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "storedName" VARCHAR(255) NOT NULL,
    "mimeType" VARCHAR(255) NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_ContactEmailMessageAttachment" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMeeting" (
    "id" UUID NOT NULL,
    "contactId" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(255),
    "status" "ContactMeetingStatus" NOT NULL DEFAULT 'pending',
    "clientUnread" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_ContactMeeting" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMeetingFile" (
    "id" UUID NOT NULL,
    "meetingId" UUID NOT NULL,
    "uploadedById" UUID,
    "name" VARCHAR(500) NOT NULL,
    "contentType" VARCHAR(255) NOT NULL,
    "size" INTEGER NOT NULL,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_ContactMeetingFile" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactTicket" (
    "id" UUID NOT NULL,
    "number" SERIAL NOT NULL,
    "contactId" UUID NOT NULL,
    "meetingId" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(8000),
    "status" "ContactTicketStatus" NOT NULL DEFAULT 'open',
    "priority" "ContactPriority" NOT NULL DEFAULT 'medium',
    "assigneeUserId" UUID,
    "clientUnread" BOOLEAN NOT NULL DEFAULT false,
    "createdByClient" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_ContactTicket" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactTicketMessage" (
    "id" UUID NOT NULL,
    "ticketId" UUID NOT NULL,
    "senderType" "TicketMessageSender" NOT NULL,
    "senderUserId" UUID,
    "senderName" VARCHAR(255) NOT NULL,
    "body" VARCHAR(20000) NOT NULL,
    "isInternalNote" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_ContactTicketMessage" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "ContactTicketActivity" (
    "id" UUID NOT NULL,
    "ticketId" UUID NOT NULL,
    "type" "ContactTicketActivityType" NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "userId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_ContactTicketActivity" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IX_ContactSoftware_contactId" ON "ContactSoftware"("contactId");

-- CreateIndex
CREATE INDEX "IX_SoftwareRelease_product_releaseDate" ON "SoftwareRelease"("product", "releaseDate");

-- CreateIndex
CREATE UNIQUE INDEX "UX_SoftwareRelease_product_version" ON "SoftwareRelease"("product", "version");

-- CreateIndex
CREATE INDEX "IX_ContactEmailThread_contactId" ON "ContactEmailThread"("contactId");

-- CreateIndex
CREATE INDEX "IX_ContactEmailThread_updatedAt" ON "ContactEmailThread"("updatedAt");

-- CreateIndex
CREATE INDEX "IX_ContactEmailMessage_threadId" ON "ContactEmailMessage"("threadId");

-- CreateIndex
CREATE INDEX "IX_ContactEmailMessage_senderUserId" ON "ContactEmailMessage"("senderUserId");

-- CreateIndex
CREATE INDEX "IX_ContactEmailMessageAttachment_messageId" ON "ContactEmailMessageAttachment"("messageId");

-- CreateIndex
CREATE INDEX "IX_ContactMeeting_contactId" ON "ContactMeeting"("contactId");

-- CreateIndex
CREATE INDEX "IX_ContactMeeting_startsAt" ON "ContactMeeting"("startsAt");

-- CreateIndex
CREATE INDEX "IX_ContactMeetingFile_meetingId" ON "ContactMeetingFile"("meetingId");

-- CreateIndex
CREATE INDEX "IX_ContactMeetingFile_uploadedById" ON "ContactMeetingFile"("uploadedById");

-- CreateIndex
CREATE INDEX "IX_ContactTicket_contactId" ON "ContactTicket"("contactId");

-- CreateIndex
CREATE INDEX "IX_ContactTicket_meetingId" ON "ContactTicket"("meetingId");

-- CreateIndex
CREATE INDEX "IX_ContactTicket_assigneeUserId" ON "ContactTicket"("assigneeUserId");

-- CreateIndex
CREATE INDEX "IX_ContactTicket_status" ON "ContactTicket"("status");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_ContactTicket_number" ON "ContactTicket"("number");

-- CreateIndex
CREATE INDEX "IX_ContactTicketMessage_ticketId" ON "ContactTicketMessage"("ticketId");

-- CreateIndex
CREATE INDEX "IX_ContactTicketMessage_senderUserId" ON "ContactTicketMessage"("senderUserId");

-- CreateIndex
CREATE INDEX "IX_ContactTicketMessageAttachment_messageId" ON "ContactTicketMessageAttachment"("messageId");

-- CreateIndex
CREATE INDEX "IX_ContactTicketActivity_ticketId" ON "ContactTicketActivity"("ticketId");

-- CreateIndex
CREATE INDEX "IX_ContactNote_meetingId" ON "ContactNote"("meetingId");

-- CreateIndex
CREATE INDEX "IX_ContactTask_assigneeUserId" ON "ContactTask"("assigneeUserId");

-- CreateIndex
CREATE INDEX "IX_ContactTask_meetingId" ON "ContactTask"("meetingId");

-- CreateIndex
CREATE INDEX "IX_Notification_contactId" ON "Notification"("contactId");

-- CreateIndex
CREATE INDEX "IX_User_contactId" ON "User"("contactId");

-- AddForeignKey
ALTER TABLE "ContactNote" ADD CONSTRAINT "ContactNote_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "ContactMeeting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactTask" ADD CONSTRAINT "ContactTask_assigneeUserId_fkey" FOREIGN KEY ("assigneeUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactTask" ADD CONSTRAINT "ContactTask_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "ContactMeeting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactSoftware" ADD CONSTRAINT "ContactSoftware_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactEmailThread" ADD CONSTRAINT "ContactEmailThread_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactEmailMessage" ADD CONSTRAINT "ContactEmailMessage_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "ContactEmailThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactEmailMessage" ADD CONSTRAINT "ContactEmailMessage_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactEmailMessageAttachment" ADD CONSTRAINT "ContactEmailMessageAttachment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ContactEmailMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactMeeting" ADD CONSTRAINT "ContactMeeting_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactMeetingFile" ADD CONSTRAINT "ContactMeetingFile_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "ContactMeeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactMeetingFile" ADD CONSTRAINT "ContactMeetingFile_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactTicket" ADD CONSTRAINT "ContactTicket_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactTicket" ADD CONSTRAINT "ContactTicket_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "ContactMeeting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactTicket" ADD CONSTRAINT "ContactTicket_assigneeUserId_fkey" FOREIGN KEY ("assigneeUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactTicketMessage" ADD CONSTRAINT "ContactTicketMessage_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ContactTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactTicketMessage" ADD CONSTRAINT "ContactTicketMessage_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactTicketMessageAttachment" ADD CONSTRAINT "ContactTicketMessageAttachment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ContactTicketMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactTicketActivity" ADD CONSTRAINT "ContactTicketActivity_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ContactTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactTicketActivity" ADD CONSTRAINT "ContactTicketActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

