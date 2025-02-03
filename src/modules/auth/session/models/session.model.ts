import { Field, ID, ObjectType } from "@nestjs/graphql";
import type { LocationInfo, DeviceInfo, SessionMetaData } from "src/shared/types/session-metadata.types";

@ObjectType()
export class LocationModel implements LocationInfo {
    @Field(() => String)
    public country: string;

    @Field(() => String)
    public city: string;
    
    @Field(() => Number)
    public longitude: number;

    @Field(() => Number)
    public latitude: number;
}   

@ObjectType()
export class DeviceModel implements DeviceInfo {
    @Field(() => String)
    public browser: string;

    @Field(() => String)
    public os: string;
    
    @Field(() => String)
    public type: string;
}


@ObjectType()
export class SessionMetadataModel implements SessionMetaData {
    @Field(() => LocationModel)
    public location: LocationModel;

    @Field(() => LocationModel)
    public device: DeviceModel;

    @Field(() => String)
    public ip: string;
}

@ObjectType()
export class SessionModel {
    @Field(() => ID)
    public id: string;

    @Field(() => String)
    public userId: string;

    @Field(() => String)
    public createdAt: string;

    @Field(() => SessionMetadataModel)
    public metadata: SessionMetadataModel;
}