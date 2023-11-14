// @ts-ignore
import { getServerSession } from '#auth';
// @ts-ignore
export default eventHandler(async (event) => {
  const session = await getServerSession(event)
  console.log(session?.user)
  return 'ddddd'
})
