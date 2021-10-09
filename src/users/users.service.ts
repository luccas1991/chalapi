import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateGrowDto } from "./dto/createGrow.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { User, UserDocument } from "./schema/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createCatDto: CreateUserDto): Promise<User> {
    const createdCat = new this.userModel(createCatDto);
    return createdCat.save();
  }

  async addGrow(createGrowDto: CreateGrowDto): Promise<User> {
    const user = await this.userModel.findOne({ name: createGrowDto.userName });
    user.grows.push({
      image: createGrowDto.image,
      name: createGrowDto.name,
      recipeId: createGrowDto.recipeId,
      startDate: createGrowDto.startDate,
    });

    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
