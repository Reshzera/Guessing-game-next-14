// app/api/blur-image/route.js

import sharp, { FormatEnum } from "sharp";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");
  const blurLevel = parseFloat(searchParams.get("blur") || "0");

  if (!imageUrl) {
    return new Response("Image URL not provided", { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    const extension =
      (imageUrl.split(".").pop()?.toLowerCase() as keyof FormatEnum) ?? "";

    let format: keyof FormatEnum = "jpeg";

    if (["png", "jpeg", "jpg", "gif"].includes(extension)) {
      format = extension === "jpg" ? "jpeg" : extension;
    }

    const image = sharp(Buffer.from(buffer));

    if (blurLevel > 0) {
      image.blur(blurLevel);
    }

    image.toFormat("avif");

    const processedImageBuffer = await image.toBuffer();

    return new Response(processedImageBuffer, {
      status: 200,
      headers: {
        "Content-Type": `image/${format}`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error processing image", { status: 500 });
  }
}
