import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, ...data } = body;
  if (!data.chatId) {
    const chat = await prisma.chat.create({
      data: {
        title: "新对话",
      },
    });
    data.chatId = chat.id;
  } else {
    // 更新对话更新时间
    await prisma.chat.update({
      data: {
        updateTime: new Date(),
      },
      where: {
        id: data.chatId,
      },
    });
  }
  //  upsert 创建或者更新数据
  const message = await prisma.message.upsert({
    create: data,
    update: data,
    where: {
      id,
    },
  });
  return NextResponse.json({ code: 0, data: { message } });
}
