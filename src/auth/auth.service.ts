import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  private messageErrorCredentials = `Fail login, review your credentials.`;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: this.getJwt({ email: user.email })
      };
    } catch (e) {
      this.handleDbErros(e);
    }
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });

    if (!user)
      throw new UnauthorizedException(`${this.messageErrorCredentials}`);

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(`${this.messageErrorCredentials}`);

    return {
      ...user,
      token: this.getJwt({ email: user.email })
    };
    //TODO: retornar token.
  }

  private handleDbErros(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(`${error.detail}`);

    console.log(error);

    throw new InternalServerErrorException(`Check the console logs`);
  }
}
