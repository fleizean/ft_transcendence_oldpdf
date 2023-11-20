import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from '../../../entities/concrete/achievement.entity';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement)
    private achievementRepository: Repository<Achievement>,
  ) {}

  async createAchievement(title: string, description: string, condition: string): Promise<Achievement> {
    const achievements = new Achievement();
    achievements.title = title;
    achievements.description = description;
    achievements.condition = condition;

    return await this.achievementRepository.save(achievements);
  }

  async getAll(): Promise<Achievement[]> {
    return await this.achievementRepository.find();
    }
}
