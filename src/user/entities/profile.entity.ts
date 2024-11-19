import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { User } from './user.entity';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ versionKey: false })
export class Profile {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  headline: string;

  @Prop({ required: true })
  biography: string;

  @Prop({ required: false, default: '' })
  address?: string;

  @Prop({ required: false, default: '' })
  avatar?: string;

  @Prop({ required: false, default: '' })
  website?: string;

  @Prop({ required: false, default: '' })
  behance?: string;

  @Prop({ required: false, default: '' })
  facebook?: string;

  @Prop({ required: false, default: '' })
  linkedin?: string;

  @Prop({ required: false, default: '' })
  youtube?: string;

  @Virtual({
    get: function (this: Profile) {
      return `${ this.firstName } ${ this.lastName }`;
    }
  })
  fullName: string;

  @Prop({ required: false, default: false })
  subscribed: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User | Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

ProfileSchema.set('toObject', { virtuals: true });
ProfileSchema.set('toJSON', { virtuals: true });
