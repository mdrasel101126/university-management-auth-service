import { User } from './user.model';

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id;
};

export const generatedUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0'); // 00000
  //increament by 1
  const increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return increamentedId;
};
