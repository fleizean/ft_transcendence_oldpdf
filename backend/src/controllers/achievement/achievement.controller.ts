import { BadRequestException, Controller, Get, Post, Body } from '@nestjs/common';
import { AchievementService } from 'src/business/concrete/achievement/achievement.service';

@Controller('achievements')
export class AchievementController {
  constructor(private achievementService: AchievementService) {}

  @Post('create')
  async createAchievement(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('condition') condition: string,
  ) {
    return this.achievementService.createAchievement(title, description, condition);
  }

  @Get('/getall')
  async getAll() {
    const result = this.achievementService.getAll();
    return result;
  }
}
