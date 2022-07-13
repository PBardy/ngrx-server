import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { IUser } from '@/interfaces/user.interface';
import { SignInRequestDTO } from '@/dtos/auth/sign-in-request.dto';
import { SignUpRequestDTO } from '@/dtos/auth/sign-up-request.dto';
import { SignOutRequestDTO } from '@/dtos/auth/sign-out-request.dto';
import { SignInResponseDTO } from '@/dtos/auth/sign-in-response.dto';
import { SignUpResponseDTO } from '@/dtos/auth/sign-up-response.dto';
import { isEmpty } from 'class-validator';
import { HttpException } from '@/exceptions/HttpException';
import { User } from '@/models/user.model';
import { compare } from 'bcrypt';
import { UserType } from '@/models/user-type.model';
import { UserDTO } from '@/dtos/user/user.dto';

class AuthService {
  public async refreshSession(userId: number): Promise<SignInResponseDTO> {
    const user = await User.query().findById(userId).withGraphJoined('userType');
    if (isEmpty(user)) {
      throw new HttpException(404, 'Cannot find user to refresh');
    }

    return new SignInResponseDTO(UserDTO.fromModel(user), this.createToken(user).token);
  }

  public async signIn(dto: SignInRequestDTO): Promise<SignInResponseDTO> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid credentials');
    }

    const user = await User.query().findOne({ email: dto.email }).withGraphJoined('userType').skipUndefined();
    if (isEmpty(user)) {
      throw new HttpException(404, 'Invalid credentials');
    }

    const matches = await compare(dto.password, user.password);
    if (!matches) {
      throw new HttpException(401, 'Invalid credentials');
    }

    return new SignInResponseDTO(UserDTO.fromModel(user), this.createToken(user).token);
  }

  public async signUp(dto: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid credentials');
    }

    const user = await User.query().findOne({ email: dto.email });
    if (!isEmpty(user)) {
      throw new HttpException(409, `User with email ${dto.email} already exists`);
    }

    const userType = await UserType.query().findOne({ tag: dto.userType });
    if (isEmpty(userType)) {
      throw new HttpException(422, 'Invalid user type');
    }

    const newUser = await User.query()
      .insertAndFetch({
        email: dto.email,
        lastName: dto.lastName,
        firstName: dto.firstName,
        password: dto.password,
        userTypeId: userType.id,
      })
      .withGraphJoined('userType')
      .skipUndefined();

    return new SignUpResponseDTO(UserDTO.fromModel(newUser), this.createToken(newUser).token);
  }

  public async signOut(dto: SignOutRequestDTO): Promise<void> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid credentials');
    }

    // TODO: clear auth token from table
    // prevent refresh tokens being user to restore session, without re-sign-in
  }

  public createToken(user: IUser): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
