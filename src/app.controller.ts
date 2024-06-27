import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { client } from './utils/edgedb';
import e from './utils/e';
import type { BlogPosts } from './edgeql-js/interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/blog-posts')
  async getBlogPosts(): Promise<BlogPosts[] | { error: boolean }> {
    try {
      const blogPosts = await e
        .select(e.BlogPosts, () => ({
          ...e.BlogPosts['*'],
        }))
        .run(client);

      return blogPosts;
      
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  @Post('/blog-post')
  async createBlogPosts(
    @Body() createBlogPostDto: BlogPosts,
  ): Promise<{ success: boolean; id?: string }> {
    try {
      const result = await e
        .insert(e.BlogPosts, {
          content: createBlogPostDto.content,
          title: createBlogPostDto.title,
          userName: createBlogPostDto.userName,
        })
        .run(client);

      if (result && result.id) {
        return { success: true, id: result.id };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
}
