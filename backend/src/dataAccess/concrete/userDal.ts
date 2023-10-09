import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/concrete/user.entity';
import { UserProfileInfoDto } from 'src/entities/dto/userProfileInfoDto';
import { Repository } from 'typeorm';

@Injectable()
export class UserDal extends Repository<User> {

}