import { sleep } from "@/common/util";
import { MessageRequestBody } from "@/types/chat";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { messages } = (await request.json()) as MessageRequestBody;
  const encoder = new TextEncoder();
  // 数据流
  const stream = new ReadableStream({
    async start(controller) {
      // 返回消息列表中最后一条的内容
      const messageText = messages[messages.length - 1].content;

      // 遍历消息内容发送客户端
      for (let i = 0; i < messageText.length; i++) {
        // 模拟网络传输
        await sleep(100);
        controller.enqueue(encoder.encode(messageText[i]));
      }
      // 结束数据流
      controller.close();
    },
  });
  // 返回数据流客户端
  return new Response(stream);
}
