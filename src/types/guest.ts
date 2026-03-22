export enum GuestConfirmationStatus {
  Accepted = 'accepted',
  Declined = 'declined',
  Pending = 'pending',
}

export enum GuestSource {
  Groom = 'groom',
  Bride = 'bride',
}

export enum GuestAgeComparison {
  Older = 'older',
  Younger = 'younger',
  Same = 'same',
}

export enum GuestGender {
  Male = 'male',
  Female = 'female',
}

export type Guest = {
  _id: string;
  name: string;
  status: GuestConfirmationStatus;
  memberCount: number;
  invited: boolean;
  guestSource: GuestSource;
  ageComparison: GuestAgeComparison;
  gender?: GuestGender;
};

export type GuestListPaginationResponse = {
  data: Guest[];
  total: number;
  groomMemberCount: number;
  brideMemberCount: number;
};
