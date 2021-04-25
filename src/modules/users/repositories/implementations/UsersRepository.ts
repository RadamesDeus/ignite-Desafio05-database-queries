import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({user_id,}: IFindUserWithGamesDTO): Promise<User | undefined> {
    const user =  await this.repository.findOne(user_id,{
      relations:["games"],
    })
    return user
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("SELECT * from users order by first_name"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const firstname = first_name[0].toUpperCase() + first_name.substr(1).toLowerCase()
    const lastname = last_name[0].toUpperCase() + last_name.substr(1).toLowerCase()
    const sql ="SELECT * FROM users where first_name = '" + firstname + "' and last_name = '" + lastname+"'";
    
    return this.repository.query(sql); // Complete usando raw query
  }
}
