export type InvitationResponse = {
    invite_id: string;
    account_id: string;
    sender_id: string;
    recipient_email: string;
    role: string;
    status: string;
    expires_at: string;
    created_at: string;
    updated_at: string;
};

export type InvitationListResponse = {
    message: string;
    status: string;
    data: InvitationResponse[];
};