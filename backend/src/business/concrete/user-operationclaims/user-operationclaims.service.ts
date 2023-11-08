import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm'
import { UserOperationClaim } from "src/core/entities/concrete/userOperationClaim.entity";

@Injectable()
export class UserOperationClaimService {
    constructor(
        @InjectRepository(UserOperationClaim)
        private readonly userOperationClaimRepository: Repository<UserOperationClaim>,
    ) {}
    
    async add(userId: number, operationClaimId: number): Promise<UserOperationClaim> {
        const userOperationClaim = new UserOperationClaim();
        userOperationClaim.userId = userId;
        userOperationClaim.operationClaimId = operationClaimId;

        return this.userOperationClaimRepository.save(userOperationClaim);
    }
}