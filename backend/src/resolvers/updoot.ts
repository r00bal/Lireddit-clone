import { Resolver, Query } from 'type-graphql';
import { Updoot } from '../entities/Updoot';

@Resolver()
export class UpdootResolver {
  @Query(() => [Updoot])
  async updots(): Promise<Updoot[]> {
    return Updoot.find();
  }
}
