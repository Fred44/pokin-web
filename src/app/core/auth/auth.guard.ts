import { redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);
export const redirectLoggedInToHome = () => redirectLoggedInTo(['pokers']);
