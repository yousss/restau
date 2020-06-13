import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop()
    email: string;

    @Prop()
    image: string;

    @Prop()
    createdAt: Date;

    @Prop()
    dateOfBirth: Date;
}


export const ProfileSchema = SchemaFactory.createForClass(Profile);
