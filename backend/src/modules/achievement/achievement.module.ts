import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from 'src/entities/concrete/achievement.entity';
import { AchievementController } from 'src/controllers/achievement/achievement.controller';
import { AchievementService } from 'src/business/concrete/achievement/achievement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Achievement]), // UserAchievement Entity'sini ekleyin
  ],
  controllers: [AchievementController],
  providers: [AchievementService],
})
export class AchievementModule {}
