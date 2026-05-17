-- Marks tickets the client opened themselves (vs. opened for them by the
-- team). Clients get full manage rights (close/reopen) only on their own
-- tickets; team-opened tickets are view + reply only.

ALTER TABLE "ContactTicket" ADD COLUMN "createdByClient" BOOLEAN NOT NULL DEFAULT false;
