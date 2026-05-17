-- Adds a per-record "client has not seen this yet" flag, used to drive the
-- unseen badges on the client portal sidebar (Tickets / Meetings / Software).
-- Email threads already track this via ContactEmailThread.unread.

ALTER TABLE "ContactTicket"   ADD COLUMN "clientUnread" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "ContactMeeting"  ADD COLUMN "clientUnread" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "ContactSoftware" ADD COLUMN "clientUnread" BOOLEAN NOT NULL DEFAULT false;
