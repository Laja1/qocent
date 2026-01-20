export type createInviteRequest = {
    recipient_identifier: string;
    role: string;
    expires_in_hours: number;
};

export type RevokeInvitationPayload = {
    invite_id: string;
};