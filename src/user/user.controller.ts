import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get('')
  async getAdminUsers() {
    return await this.user.getAdminUser();
  }
}
