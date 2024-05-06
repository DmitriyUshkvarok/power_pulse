import jwt from 'jsonwebtoken';
import { generateToken, veryfyToken } from '../token';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('generateToken', () => {
  it('should generate token with correct payload', () => {
    const mockToken = 'mockToken';
    const mockPayload = {
      user: {
        username: 'testuser',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      },
    };

    (jwt.sign as jest.Mock).mockReturnValueOnce(mockToken);

    const result = generateToken(mockPayload);

    expect(jwt.sign).toHaveBeenCalledWith(
      mockPayload,
      process.env.TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    expect(result).toBe(mockToken);
  });
});

describe('veryfyToken', () => {
  it('should verify token and return payload', () => {
    const mockToken = 'mockToken';
    const mockPayload = {
      user: {
        username: 'testuser',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      },
    };

    (jwt.verify as jest.Mock).mockReturnValueOnce(mockPayload);

    const result = veryfyToken(mockToken);

    expect(jwt.verify).toHaveBeenCalledWith(
      mockToken,
      process.env.TOKEN_SECRET
    );
    expect(result).toEqual(mockPayload);
  });
});
