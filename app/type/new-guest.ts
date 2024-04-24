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
  alcohols: string[] | null[];
  aditionalInfo: string | null;
}

export interface NewGuest {
  id: string;
  guestID: string;
  firstName: string;
  lastName: string;
  email: string;
  exists: boolean;
  timestamp: string;
  formData: GuestPreferences | null;
}