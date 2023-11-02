// user-achievement.controller.ts

import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UserAchievementService } from '../../business/concrete/user-achievement/user-achievement.service';

@Controller('user-achievements')
export class UserAchievementController {
  constructor(private userAchievementService: UserAchievementService) {}

  @Post('create/:userId/:achievementId')
  async createUserAchievement(
    @Param('userId') userId: number,
    @Param('achievementId') achievementId: number,
  ) {
    return this.userAchievementService.createUserAchievement(userId, achievementId);
  }

  @Get('user/:userId')
  async getUserAchievementsByUser(@Param('userId') userId: number) {
    return this.userAchievementService.getUserAchievementsByUser(userId);
  }
}
