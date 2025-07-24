import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from 'src/employees/employees.module';
import { Team, TeamSchema } from 'src/schemas/Team.schema';
import { ProjectModule } from 'src/projects/projects.module';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { DatabaseModule } from 'src/config/database.module';
import { LoggingTeamDecorator } from './decorators/logging-team.decorator';
import { ValidationTeamDecorator } from './decorators/validation-team.decorator';
import { CacheTeamDecorator } from './decorators/cache-team.decorator';
import { TeamFactory } from './factory/team.factory';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
    forwardRef(() => EmployeeModule),
    forwardRef(() => ProjectModule), // Sử dụng forwardRef để tránh vòng lặp
    ProjectModule
  ],
  providers: [
    TeamsService,
    TeamFactory,
    {
      provide: 'TeamServiceDecorated',
      useFactory: (teamService: TeamsService) => {
        const withValidation = new ValidationTeamDecorator(teamService);
        const withLogging = new LoggingTeamDecorator(withValidation);
        const withCache = new CacheTeamDecorator(withLogging);
        return withCache;
      },
      inject: [TeamsService]
    }
  ],
  controllers: [TeamsController],
  exports: [TeamsService, MongooseModule]
})
export class TeamModule {}