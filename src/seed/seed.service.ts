import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from "./data/seed.data";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../auth/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const userAdmin: User = await this.insertUser();
    await this.insertNewProducts(userAdmin);

    return 'SEED EXECUTED!';
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUser() {
    const seedUser = initialData.users;

    const users: User[] = [];
    seedUser.forEach((user) => {
      users.push(
        this.userRepository.create({
          ...user,
          password: bcrypt.hashSync(user.password, 10),
        }),
      );
    });

    await this.userRepository.save(users);
    return users[2];
  }

  private async insertNewProducts(user: User) {
    await this.productsService.deleteAllProducts();
    const seedProducts = initialData.products;
    const insertPromises = [];
    seedProducts.forEach((product) => {
      insertPromises.push(this.productsService.create(product, user));
    });
    await Promise.all(insertPromises);
    return true;
  }
}
