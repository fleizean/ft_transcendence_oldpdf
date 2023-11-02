import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserAchievements } from './userAchievement.entity';


@Entity('Achievements')
export class Achievement {
    @PrimaryGeneratedColumn()
    achievement_id: number;

    @Column({ unique: true })
    title: string;

    @Column()
    description: string;

    @Column()
    condition: string;

    @OneToMany(() => UserAchievements, userAchievement => userAchievement.achievement)
    userAchievements: UserAchievements[];
}