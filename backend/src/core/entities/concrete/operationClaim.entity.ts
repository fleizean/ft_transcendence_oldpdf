import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserOperationClaim } from './userOperationClaim.entity';

@Entity({ name: 'operationclaims' })
export class OperationClaim {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    explanation: number;

    @Column()
    descriotion: string;

    @ManyToOne(() => UserOperationClaim, (UserOperationClaim) => UserOperationClaim.operationClaimId)
    userOperationClaims: UserOperationClaim[];
}