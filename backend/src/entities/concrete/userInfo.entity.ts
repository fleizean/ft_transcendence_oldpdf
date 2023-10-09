import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('UserInfos')
export class UserInfos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    loginDate: Date;

    @Column()
    profileCheck: boolean;

    @Column({ nullable: true})
    profileImagePath: string;

    @Column({ nullable: true})
    profileText: string;

    @Column()
    gender: boolean;

    @Column({ type: 'timestamp', nullable: true})
    birthdayDate: Date;
}