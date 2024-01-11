import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @ApiOperation({ description: 'Get admin users' })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Admin users not found.',
  })
  @Get('')
  async getAdminUsers() {
    return await this.user.getAdminUser();
  }
}
