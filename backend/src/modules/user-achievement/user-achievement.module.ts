import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAchievementService } from '../../business/concrete/user-achievement/user-achievement.service';
import { UserAchievementController } from '../../controllers/user-achievement/user-achievement.controller';
import { UserAchievements } from '../../entities/concrete/userAchievement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAchievements]), // UserAchievement Entity'sini ekleyin
  ],
  controllers: [UserAchievementController],
  providers: [UserAchievementService],
})
export class UserAchievementModule {}
