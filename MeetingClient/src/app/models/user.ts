export interface User{
    userName: string;
    token: string;
    photoUrl: string;
    displayName: string;
    lastActive: Date;
    roles: string[];
}