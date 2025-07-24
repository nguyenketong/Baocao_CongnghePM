import { IsString, IsNotEmpty } from 'class-validator';

export class AddTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsString()
  @IsNotEmpty()
  addedBy: string;
}