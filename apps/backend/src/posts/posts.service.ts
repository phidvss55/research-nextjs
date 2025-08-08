import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { uuidv4 } from 'src/common/helper';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  create(createPostDto: CreatePostDto) {
    const post = {
      ...createPostDto,
      id: uuidv4(),
    };
    this.posts.push(post);
    return post;
  }

  findAll() {
    return this.posts;
  }
}
