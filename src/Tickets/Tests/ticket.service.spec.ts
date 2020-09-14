import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../authentication/auth.service';
import { TicketsService } from '../ticket.service';

describe('Tickets Service', () => {
  let ticketService: TicketsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        AuthService,
        {
          provide: getModelToken('Ticket'),
          useValue: {},
        },
        {
          provide: getModelToken('User'),
          useValue: {},
        },
      ],
    }).compile();
    ticketService = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(ticketService).toBeDefined();
  });

  describe('getTicket', () => {
    it('There is no ticket for values <1 and >40', async () => {
      const ticket = await ticketService.getTicket(0);
      expect(ticket).toBe('There is no ticket with the given id');
    });
  });

  describe('updateTicket', () => {
    it('There is no ticket for values <1 and >40', async () => {
      const ticket = await ticketService.updateTicket(0, '');
      expect(ticket).toBe('There is no ticket with the given id');
    });
  });
});
