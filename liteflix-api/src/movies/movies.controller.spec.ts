import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                title: 'Test Movie',
                imageUrl: 'http://example.com/image.jpg',
              },
            ]),
            create: jest
              .fn()
              .mockImplementation((movie) =>
                Promise.resolve({ ...movie, id: Date.now() }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all movies', async () => {
    expect(await controller.getAllMovies()).toEqual([
      {
        id: 1,
        title: 'Test Movie',
        imageUrl: 'http://example.com/image.jpg',
      },
    ]);
  });

  it('should add a movie', async () => {
    const newMovie = {
      title: 'New Movie',
      imageUrl: 'http://example.com/new.jpg',
    };
    expect(await controller.addMovie(newMovie)).toEqual({
      ...newMovie,
      id: expect.any(Number),
    });
  });
});
