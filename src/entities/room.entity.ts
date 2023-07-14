import { Column,Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})  // UTC Saat ve Tarih Dilimi
  createdAt: Date;

  @Column({ default: false })
  isDeleted: boolean;
}
