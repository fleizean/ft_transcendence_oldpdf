import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationClaimService } from 'src/business/concrete/operationclaims/operationclaims.service';
import { OperationClaim } from 'src/core/entities/concrete/operationClaim.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([OperationClaim]), // UserAchievement Entity'sini ekleyin
  ],
  controllers: [],
  providers: [OperationClaimService],
})
export class OperationClaimsModule {}
