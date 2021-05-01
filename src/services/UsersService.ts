import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/Users";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
    
    //verificar se o user existe
    const userExists = await this.usersRepository.findOne({ email });
    //se existir, retorna o usuario cadastrado
    if (userExists) {
      return userExists;
    }
    //se não existir, salvar no DB
    const user = this.usersRepository.create({ email });
    await this.usersRepository.save(user);

    return user;
  }
  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });

    return user;
  }
}

export { UsersService };
