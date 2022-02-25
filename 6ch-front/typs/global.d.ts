type thread = {
  id: number,
  title: string,
  createdAt: string,
  active: boolean
}

type post = {
  id: number,
  userName: string,
  content: string,
  createdAt: string,
  threadId: number
}

type pathParams = {
  id: number
}
