import { Member } from '@honda500/data-access';
import { MembersService } from '@honda500/repositories';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('members')
export class MembersController {
  constructor(private readonly repository: MembersService) {}

  @Get()
  members(): Promise<[Member[], number]> {
    return this.repository.read();
  }

  @Get('search')
  membersSearch(@Query('needle') needle: string): Promise<Member[]> {
    return this.repository.search(needle);
  }

  @Post()
  createMembers(@Body() member: Member) {
    return this.repository.create(member);
  }
}
