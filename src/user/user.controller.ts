import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserService } from './user.service';
import { ProfileDto } from './dto/profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.userService.get(id);
  }

  @Patch(':id')
  update(@Param('id') id: Types.ObjectId, @Body() profile: ProfileDto) {
    return this.userService.update(id, profile);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.userService.remove(id);
  }
}
