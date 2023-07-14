import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Room } from './entities/room.entity';
import { RoomMessage } from './entities/room-message.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(RoomMessage)
    private roomMessageRepository: Repository<RoomMessage>,
  ) {}

  async getRoom(clientUserId: number): Promise<any> {
    const rooms = await this.roomRepository.find();

    const roomsWithLastMessage = await Promise.all(
      rooms.map(async (room) => {
        const lastMessage = await this.roomMessageRepository.findOne({
          where: { room: { id: room.id }, isDeleted: false },
          order: { createdAt: 'DESC' },     // son mesaj en üstte olacak şekilde sıralama
          relations: ['sender', 'receiver'],
        });

        if (!lastMessage) {
          return null;
        }

        const sender = lastMessage.sender;
        const receiver = lastMessage.receiver;

        let isCurrentUser = null;
        if (clientUserId === sender.id) {
          isCurrentUser = sender;            // client user'ı senderdır.
        } else if (clientUserId === receiver.id) {
          isCurrentUser = receiver;          // client user'ı receiverdır.
        }

        return {                              // response sadece gerekli alanları içerir.
          id: room.id,
          lastMessage: {
            content: lastMessage.content,
            createdAt: lastMessage.createdAt,
            sender: isCurrentUser ? 
          {
            id: isCurrentUser.id,
            fullName: isCurrentUser.fullName,
            photo: isCurrentUser.photo,
          }:  
          {
            id: sender.id,
            fullName: sender.fullName,
            photo: sender.photo,
          },
            receiver: isCurrentUser ? 
          {
            id: isCurrentUser.id,
            fullName: isCurrentUser.fullName,
            photo: isCurrentUser.photo,
          }:  
          {
            id: receiver.id,
            fullName: receiver.fullName,
            photo: receiver.photo,
          },
          },
        };
      })
    );

    return {
      rooms: roomsWithLastMessage.filter((room) => room !== null),
    };
  }
}
