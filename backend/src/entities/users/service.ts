import { DateTime } from 'luxon';
import { generateToken, invalidateToken } from '../../utils/auth';
import { UserCreateIn, UserLoginIn } from '../../utils/dtos/User';
import { compareHash, hashPassword } from '../../utils/helpers';
import * as authRepository from './repository';

export async function validateLogin(user: UserLoginIn): Promise<{ token: string } | null> {
  try {
    const password = await authRepository.getPassword(user.username);
    const isPasswordValid = await compareHash(user.password, password);

    if (isPasswordValid) {
      const token = await generateToken(user.username);
      return { token };
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function logout(username: string): Promise<void> {
  try {
    invalidateToken(username);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function create(user: UserCreateIn) {
  const birthDate = DateTime.fromISO(user.birthDate).toISODate();
  const hashedPassword = hashPassword(user.password);

  const userData = {
    ...user,
    birthDate,
    password: hashedPassword,
  };

  try {
    const createdUser = await authRepository.create(userData);
    return createdUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function get(username: string) {
  try {
    const user = await authRepository.getByUsername(username);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getListeningStats(username: string) {
  try {
    const timeSpentListening = await authRepository.getListeningStats(username);
    return timeSpentListening;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRecentScrobbles(username: string, quantity: number) {
  try {
    const recentScrobbles = await authRepository.getRecentScrobbles(username, quantity);
    return recentScrobbles;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
