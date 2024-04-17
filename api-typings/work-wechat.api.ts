import { IsString, IsInt } from 'class-validator';

export class GetAccessTokenDto {
  @IsString()
  corid: string;
  @IsString()
  secret: string;
}
export class GetCollectionInfoDto {
  @IsString()
  accessToken: string;
  @IsString()
  formId: string;
}
