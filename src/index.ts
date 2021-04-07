
import p from './hello'
interface Msg {
  text: string,
  use: boolean
}

export function a(msg:Msg) {
  p(msg.text)
}

export default p
