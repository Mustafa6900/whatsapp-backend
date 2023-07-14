import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { User } from './entities/user.entity';
import { RoomMessage } from './entities/room-message.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'musti',
      password: 'Zr1slkk2s',
      database: 'whatsappdb',
      entities: [Room, User, RoomMessage],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Room, User, RoomMessage]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
