import User from "./user"
export default function socketMiddleware(server) {

  const user = User(server)

  return function socketMiddleware() {
    return next => action => {
      user.onAction(action)
      return next(action)
    }
  }
}
