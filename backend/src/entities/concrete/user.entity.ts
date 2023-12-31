import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserAchievements } from './userAchievement.entity';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30, nullable: true })
    firstName: string;

    @Column({ length: 30, nullable: true })
    lastName: string;

    @Column({ length: 20})
    nickName: string;

    @Column({ type: 'bytea', nullable: true })
    passwordHash: Buffer;

    @Column({ type: 'bytea', nullable: true })
    passwordsalt: Buffer;

    @Column({ length: 75, nullable: true })
    address: string;

    @Column({ length: 10, nullable: true })
    phone: string;

    @Column({ nullable: false })
    email: string;

    @Column({ length: 150, nullable: true })
    githubUrl: string;

    @Column({ length: 50, nullable: false }) // length 6~10?
    verificationCode: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updateTime: Date;

    @Column({ length: 50, nullable: true })
    explanation: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    isStatus: boolean;

    @OneToMany(() => UserAchievements, userAchievements => userAchievements.user)
    userAchievements: UserAchievements[];
}