export type ContactMeetingFileDto = {
  id: string;
  meetingId: string;
  name: string;
  contentType: string;
  size: number;
  uploadedByUserId?: string;
  uploadedByName?: string;
  createdAt: Date;
};
