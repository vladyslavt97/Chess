export interface UserInfo {
    id?: number;
    first?: string,
    last?: string,
    email?: string
}

export interface Message {
    id: number,
    first: string,
    last: string,
    sender_id: number;
    recipient_id: number;
    timestamp: number;
    message: string;
    created_at: string;
}

// In typscrip we DONT use ANY!
export type Action = {
    type: String;
    payload: any;
};