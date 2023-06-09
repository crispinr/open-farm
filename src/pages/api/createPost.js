// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  } else {
    const { data, error } = await prisma.posts.create({
      data: {
        ...req.body,
      },
    });

    if (data) {
      res.status(200).json({ data });
    } else if (error) {
      res.status(400).json({ success: "false" });
    }
  }
}
