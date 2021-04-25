import { getRepository, Like, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository.createQueryBuilder("games")
    .where("LOWER(title) like LOWER(:title)", { title:`%${param}%` })
    .getMany();

    return games
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("select count(*) from games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    let users: User[] = []
    const gameFind = await this.repository.createQueryBuilder("games")
    .where({id})
    .leftJoinAndSelect("games.users", "users")
    .getOne()
    
    if(gameFind)
    users = gameFind.users
    
    return users

    
  }
}
