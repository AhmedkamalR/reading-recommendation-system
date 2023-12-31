import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ReadingIntervalService } from '../services/reading-intervals.service';
import { AppResponse } from '../util/response';
import { AuthGuard } from '../auth/auth.guard';
import { BookReadsService } from './../services/book-reads.service';

@Controller('reading-intervals')
export class ReadingRecommendationController {
  constructor(
    private readingIntervalService: ReadingIntervalService,
    private bookReadsService: BookReadsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('submit-interval')
  async submitReadingInterval(
    @Body('user_id') user_id: number,
    @Body('book_id') book_id: number,
    @Body('start_page') start_page: number,
    @Body('end_page') end_page: number,
  ): Promise<{ status_code: string }> {
    await this.readingIntervalService.submitReadingInterval(
      user_id,
      book_id,
      start_page,
      end_page,
    );
    return { status_code: 'success' };
  }

  @UseGuards(AuthGuard)
  @Get('top-books')
  async getTopRecommendedBooks(): Promise<AppResponse> {
    return this.readingIntervalService.getTopRecommendedBooks();
  }

  @UseGuards(AuthGuard)
  @Post('submit-interval-v2')
  async submitReadingIntervalV2(
    @Body('book_id') book_id: number,
    @Body('start_page') start_page: number,
    @Body('end_page') end_page: number,
  ): Promise<{ status_code: string }> {
    await this.bookReadsService.submitReadingInterval(
      book_id,
      start_page,
      end_page,
    );
    return { status_code: 'success' };
  }

  @UseGuards(AuthGuard)
  @Get('top-books-v2')
  async getTopRecommendedBooksV2(): Promise<AppResponse> {
    return this.bookReadsService.getTopRecommendedBooks();
  }
}
