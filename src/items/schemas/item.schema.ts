import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    discount: number;

    @Prop()
    stock: number;

    @Prop()
    description: string;

    @Prop({ required: true })
    image: string;
}


export const ItemSchema = SchemaFactory.createForClass(Item);
