import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { client } from './utils/edgedb';
import e from './utils/e';
import type { BlogPosts } from './edgeql-js/interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/blog-posts')
  async getBlogPosts(): Promise<BlogPosts[]> {
    const blogPosts = await e
      .select(e.BlogPosts, () => ({
        ...e.BlogPosts['*'],
      }))
      .run(client);

    return blogPosts;
  }

  @Post('/blog-post')
  async createBlogPosts(@Body() createBlogPostDto: BlogPosts): Promise<{}> {
    const { id } = await e
      .insert(e.BlogPosts, {
        content: createBlogPostDto.content,
        title: createBlogPostDto.title,
        userName: createBlogPostDto.userName,
      })
      .run(client);
    if (id) {
      return { success: true, id: id };
    } else {
      return { success: false };
    }
  }
}
