import { Member } from '@honda500/data-access';
import { Inject, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { MEMBER_REPOSITORY } from './providers';
import { ILikeWildCarded } from './utils';

@Injectable()
export class MembersService {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private readonly members: Repository<Member>
  ) {}

  create(member: Member) {
    return this.members.insert(member);
  }

  read(): Promise<[Member[], number]> {
    return this.members.findAndCount({
      loadEagerRelations: false,
    });
  }

  search(needle: string) {
    return this.members.find({
      where: [
        { name: ILikeWildCarded(needle) },
        { phone: ILikeWildCarded(needle) },
      ],
      select: ['id', 'name', 'phone'],
      loadEagerRelations: false,
    });
  }

  bulkInsert(members: Member[]) {
    return this.members.insert(members);
  }
}
