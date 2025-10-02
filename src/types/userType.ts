export type UserType = {
  name: string;
  email: string;
  lastName?: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  planType: number;
  recentlyDeleteAccount?: boolean | null;
};
