import { UserModel } from './user.model'

export async function createUser(user: any) {
  return UserModel.create(user)
}

export async function getUser(username: string) {
  return UserModel.findOne({ username })
}
