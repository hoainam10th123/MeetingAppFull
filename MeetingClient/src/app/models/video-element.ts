import { Member } from "./member";

export interface VideoElement {
    muted: boolean;
    srcObject: MediaStream;
    user: Member;
}