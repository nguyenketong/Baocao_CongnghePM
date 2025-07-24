export declare class UserSettings {
    receiveNotifications?: boolean;
    receiveEmail?: boolean;
    receiveSMS?: boolean;
}
export declare const UserSettingsSchema: import("mongoose").Schema<UserSettings, import("mongoose").Model<UserSettings, any, any, any, import("mongoose").Document<unknown, any, UserSettings> & UserSettings & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserSettings, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserSettings>> & import("mongoose").FlatRecord<UserSettings> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
