import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';

describe('MoviesService', () => {
  let service: MoviesService;
  let mockRepository: jest.Mocked<Repository<Movie>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            create: jest.fn().mockImplementation((dto) => dto),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    mockRepository = module.get<Repository<Movie>>(
      getRepositoryToken(Movie),
    ) as jest.Mocked<Repository<Movie>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all movies', async () => {
    const expectedMovies = [
      {
        id: 1,
        title: 'Test Movie',
        imageUrl: 'http://example.com/image.jpg',
      },
    ];
    mockRepository.find.mockResolvedValue(expectedMovies);
    expect(await service.findAll()).toEqual(expectedMovies);
  });

  it('should save a movie', async () => {
    const movieDto = {
      title: 'New Movie',
      imageUrl: 'http://example.com/new.jpg',
    };
    const movie = { id: 1, ...movieDto };
    mockRepository.create.mockReturnValue(movie); // Ensure `create` returns a movie object
    mockRepository.save.mockResolvedValue(movie);

    expect(await service.create(movieDto)).toEqual(movie);
  });
});
