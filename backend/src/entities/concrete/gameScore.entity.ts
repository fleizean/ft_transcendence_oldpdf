import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('gameScories')
export class GameScore {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'userHostScore', type: 'integer', nullable: false })
    userHostScore: number;

    @Column({ name: 'userGuestScore', type: 'integer', nullable: false })
    userGuestScore: number;

    @Column({ name: 'resultNameId', type: 'integer', nullable: false })
    resultNameId: number;

    @Column({ name: 'updateTime', type: 'date', nullable: true })
    updateTime: Date;

    @Column({ name: 'isStatus', type: 'boolean', nullable: true })
    isStatus: boolean;
}