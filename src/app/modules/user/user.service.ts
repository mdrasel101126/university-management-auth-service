import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedUserId } from './user.utils';

const getUser = async () => {
  const users = await User.find({});
  if (users.length < 1) {
    throw new Error('Failed to get user!');
  }
  return users;
};

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated incremental id
  const id = await generatedUserId();
  user.id = id;
  //default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  //console.log(user)
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

export const UserService = {
  createUser,
  getUser,
};
