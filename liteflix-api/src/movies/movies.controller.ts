import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Get,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getAllMovies(@Res() res: Response) {
    const movies = await this.moviesService.findAll();
    const moviesWithImages = movies.map((movie) => {
      const imagePath = path.resolve(__dirname, '..', '..', movie.imageUrl);
      if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        movie.image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
      } else {
        movie.image = 'Image not found';
      }
      return { id: movie.id, title: movie.title, image: movie.image };
    });
    res.json(moviesWithImages);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new movie' })
  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created.',
    type: Movie,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          try {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${path.extname(file.originalname)}`);
          } catch (error) {
            cb(error, null);
          }
        },
      }),
    }),
  )
  async addMovie(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<Movie> {
    if (!file)
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    return await this.moviesService.create(createMovieDto, file.path);
  }
}
