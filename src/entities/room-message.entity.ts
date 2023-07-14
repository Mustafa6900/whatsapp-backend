    import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
    import { User } from './user.entity';
    import { Room } from './room.entity';

    @Entity()
    export class RoomMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})  // UTC Saat ve Tarih Dilimi
    createdAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'senderId' })
    sender: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'receiverId' })
    receiver: User;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'roomId' })
    room: Room;
    
    @Column({ default: false })
    isDeleted: boolean;
    }
