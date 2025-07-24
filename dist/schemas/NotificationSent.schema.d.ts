import { Document } from 'mongoose';
export declare class NotificationSent extends Document {
    notification_name: string;
}
export declare const NotificationSentSchema: import("mongoose").Schema<NotificationSent, import("mongoose").Model<NotificationSent, any, any, any, Document<unknown, any, NotificationSent> & NotificationSent & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NotificationSent, Document<unknown, {}, import("mongoose").FlatRecord<NotificationSent>> & import("mongoose").FlatRecord<NotificationSent> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
