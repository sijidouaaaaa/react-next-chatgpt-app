interface IMainProps{
    counter: number
}
export default function  Main(props:IMainProps){
    const {counter} = props
  return (
    <main>
      <h1>主体内容:{counter}</h1>
    </main>
  )
} 