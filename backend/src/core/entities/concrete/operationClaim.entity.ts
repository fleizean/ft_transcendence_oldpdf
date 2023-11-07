import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; // İlişkiyi OneToMany olarak güncelleyin
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
  description: string;

  @OneToMany(() => UserOperationClaim, (userOperationClaim) => userOperationClaim.operationClaim) // İlişkiyi düzeltin
  userOperationClaims: UserOperationClaim[];
}
