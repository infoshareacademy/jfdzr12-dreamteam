export interface GuestPreferences {
  id: string;
  guestUniqueID: string;
  firstName: string;
  lastName: string;
  presence: string | boolean;
  partner: string | boolean;
  child: string | boolean;
  numberOfChildren: string | number;
  selectedMenuGuest: string;
  selectedMenuPartner: string | null;
  selectedMenuChild: string | null;
  transport: string | boolean;
  accommodation: string | boolean;
  alcohols: string[] | null[];
  additionalInfo: string | null;
}

export interface NewGuest {
  id: string;
  guestID: string;
  firstName: string;
  lastName: string;
  email: string;
  exists: boolean;
  timestamp: string | number | null;
  formData: GuestPreferences | null;
  eventID: number | string | undefined;
}

export interface RelatedEventNewGuest {
  id: string;
  guestID: string;
  firstName: string;
  lastName: string;
  email: string;
  exists: boolean;
  timestamp: string | number | null;
  eventID: number | string | undefined;
}