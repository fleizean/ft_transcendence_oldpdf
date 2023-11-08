import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOperationClaimService } from './../../business/concrete/user-operationclaims/user-operationclaims.service';
import { UserOperationClaim } from 'src/core/entities/concrete/userOperationClaim.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOperationClaim]), // UserAchievement Entity'sini ekleyin
  ],
  controllers: [],
  providers: [UserOperationClaimService],
})
export class UserOperationClaimsModule {}
