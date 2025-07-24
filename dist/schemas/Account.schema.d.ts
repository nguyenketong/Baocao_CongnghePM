import { Document } from 'mongoose';
export declare class Account extends Document {
    userName: string;
    password: string;
    email: string;
}
export declare const AccountSchema: import("mongoose").Schema<Account, import("mongoose").Model<Account, any, any, any, Document<unknown, any, Account> & Account & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Account, Document<unknown, {}, import("mongoose").FlatRecord<Account>> & import("mongoose").FlatRecord<Account> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
