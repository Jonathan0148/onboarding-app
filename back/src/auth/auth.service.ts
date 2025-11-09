import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login({ username, password }: LoginDto) {
    const isValid = await this.validateUser(username, password);
    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { username };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  private async validateUser(username: string, password: string): Promise<boolean> {
    return username === 'admin' && password === '1234';
  }
}
