import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { OperationClaimDal } from 'src/dataAccess/concrete/operationClaimDal';
import { OperationClaim } from 'src/core/entities/concrete/operationClaim.entity';

@Injectable()
export class OperationClaimService {
    constructor(@InjectRepository(OperationClaim) private OperationClaimDal: OperationClaimDal) {}
    
    public async getAll(): Promise<IDataResult<OperationClaim[]>> {
        return new SuccessDataResult<OperationClaim[]>(
            await this.OperationClaimDal.find(),
            Messages.OperationClaimGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<OperationClaim>> {
        return new SuccessDataResult<OperationClaim>(
            await this.OperationClaimDal.findOne({ where: { id: id } }),
            Messages.OperationClaimGetById,
        );
    }

    public async add(operationClaim: OperationClaim): Promise<IResult> {
        const addedOperationClaim = await this.OperationClaimDal.save(operationClaim);
        return new SuccessResult(Messages.OperationClaimAdded);
    }

    public async update(updatedOperationClaim: OperationClaim): Promise<IResult> {
        const match = await this.OperationClaimDal.findOne({ where: { id: updatedOperationClaim.id } });
        if (!match) {
            return new ErrorResult(Messages.OperationClaimNotFound);
        }
        const mergedMatch = this.OperationClaimDal.merge(match, updatedOperationClaim);
        await this.OperationClaimDal.save(mergedMatch);
        return new SuccessResult(Messages.OperationClaimUpdate);
    }
    public async delete(id: number): Promise<IResult> {
        await this.OperationClaimDal.delete(id);
        return new SuccessResult(Messages.OperationClaimDeleted);
    }
}