// user-achievement.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAchievements } from '../../../entities/concrete/userAchievement.entity';
import { User } from '../../../entities/concrete/user.entity';
import { Achievement } from '../../../entities/concrete/achievement.entity';

@Injectable()
export class UserAchievementService {
  constructor(
    @InjectRepository(UserAchievements)
    private userAchievementRepository: Repository<UserAchievements>,
  ) {}

  async createUserAchievement(userId: number, achievementId: number): Promise<UserAchievements> {
    const userAchievement = new UserAchievements();
    const user = new User();
    user.id = userId;
    userAchievement.user = user;

    const achievement = new Achievement();
    achievement.achievement_id = achievementId;
    userAchievement.achievement = achievement;

    return await this.userAchievementRepository.save(userAchievement);
  }

  async getUserAchievementsByUser(userId: number): Promise<any[]> {
    const userAchievements = await this.userAchievementRepository.find({
      where: { user: { id: userId } },
      relations: ['achievement'], 
    });
  
    const achievementsWithDetails = userAchievements.map((ua) => {
      const achievement = ua.achievement;
      return {
        title: achievement.title,
        description: achievement.description,
        condition: achievement.condition,
        dateAchieved: ua.dateAchieved,
      };
    });
  
    return achievementsWithDetails;
  }  
}
