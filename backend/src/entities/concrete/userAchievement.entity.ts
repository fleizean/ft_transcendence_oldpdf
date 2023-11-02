import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Achievement } from './achievement.entity';

@Entity('UserAchievements')
export class UserAchievements {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userAchievements)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Achievement, achievement => achievement.userAchievements)
  @JoinColumn({ name: 'achievement_id' })
  achievement: Achievement;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateAchieved: Date; // Başarının kazanıldığı tarih
}
