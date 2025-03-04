/** @format */

export type CreateClientRequestType = {
  uuid?: string; // Optional: Client UUID if it's provided or needed
  email: string; // Email of the client
  state: string; // The actual client state
};
