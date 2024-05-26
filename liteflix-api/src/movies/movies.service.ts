import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dtos/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async create(
    createMovieDto: CreateMovieDto,
    filePath: string,
  ): Promise<Movie> {
    const movie = this.moviesRepository.create({
      ...createMovieDto,
      imageUrl: filePath,
    });
    return this.moviesRepository.save(movie);
  }
}
