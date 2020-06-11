export class AuthenticatedUser {
  readonly userId: string;
  email: string;
  displayName: string;
  pictureUrl?: string;
  token: string;

  constructor(options: {
    userId: string,
    email: string,
    displayName: string,
    pictureUrl?: string,
    token: string
  }) {
    this.userId = options.userId;
    this.email = options.email;
    this.displayName = options.displayName;
    this.pictureUrl = options.pictureUrl;
    this.token = options.token;
  }
}
