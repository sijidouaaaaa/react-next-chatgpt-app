import ModeSelect from "./ModeSelect";
import Example from "./Example";
export default function Welcome() {
  return (
    <div className="w-full  max-w-4xl mx-auto flex  flex-col items-center px-4 py-20">
      <ModeSelect />
      <h1 className="mt-20 text-4xl font-bold ">
        ChatGPT免费使用 - ChatGPT-Free
      </h1>
      <Example />
    </div>
  );
}
