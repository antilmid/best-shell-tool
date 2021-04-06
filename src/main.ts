
interface Msg {
  text: string,
  use: boolean
}
export function a(msg:Msg) {
  console.log(msg)
}