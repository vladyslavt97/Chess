export interface UserInfo {
    id: number;
    first: string,
    last: string,
    email: string
}

export interface Message {
    id: number,
    sender_id: number;
    recipient_id: number;
    message: string;
    timestamp: number;
    created_at: string;
}

// In typscrip we DONT use ANY!
export type Action = {
    type: String;
    payload: any;
};