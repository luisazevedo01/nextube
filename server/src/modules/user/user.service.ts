import { User, UserModel } from './user.model'

export async function createUser(
  user: Omit<User, 'comparePassword'>
): Promise<User> {
  return UserModel.create(user)
}

export async function findUserByEmail(
  email: User['email']
): Promise<User | null> {
  return UserModel.findOne({ email })
}

export async function getUsers() {
  return UserModel.find()
}
