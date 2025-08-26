import SFProRoundedBold from "@/assets/fonts/SF-Pro-Rounded-Bold.latin.base.ttf";
import SFProRoundedSemibold from "@/assets/fonts/SF-Pro-Rounded-Semibold.latin.base.ttf";
import SFProRoundedMedium from "@/assets/fonts/SF-Pro-Rounded-Medium.latin.base.ttf";
import SFProRoundedRegular from "@/assets/fonts/SF-Pro-Rounded-Regular.latin.base.ttf";
import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site.config";
import { getFormattedDate } from "@/utils/date";
import { Resvg } from "@resvg/resvg-js";
import type { APIContext, InferGetStaticPropsType } from "astro";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

const ogOptions: SatoriOptions = {
  // debug: true,
  fonts: [
    {
      data: Buffer.from(SFProRoundedRegular),
      name: "SF Pro Rounded",
      style: "normal",
      weight: 400,
    },
	
    {
      data: Buffer.from(SFProRoundedMedium),
      name: "SF Pro Rounded",
      style: "normal",
      weight: 500,
    },
    {
      data: Buffer.from(SFProRoundedSemibold),
      name: "SF Pro Rounded",
      style: "normal",
      weight: 600,
    },
    {
      data: Buffer.from(SFProRoundedBold),
      name: "SF Pro Rounded",
      style: "normal",
      weight: 700,
    },
  ],
  height: 630,
  width: 1200,
};

const markup = (title: string, pubDate: string) =>
  html` <div tw="flex flex-col w-full h-full bg-[#f2f2f2] text-[#6b6b6b]">
    <div tw="flex flex-col flex-1 w-full p-10 justify-center">
      <p tw="text-3xl mb-6 text-[#8e8e8e] font-medium">${pubDate}</p>
      <h1 tw="text-6xl font-semibold leading-snug text-[#224d67]">${title}</h1>
    </div>
    <div
      tw="flex items-end justify-between w-full p-10 border-t border-[#dbdbdb] text-3xl text-[#6b6b6b]"
    >
      <div tw="flex items-center">
        <p tw="ml-3 text-5xl text-[#545454] font-bold">${siteConfig.title}</p>
      </div>
      <p tw="text-3xl text-[#8e8e8e]">by ${siteConfig.author}</p>
    </div>
  </div>`;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
  const { pubDate, title } = context.props as Props;
  const postDate = getFormattedDate(pubDate, {
    month: "long",
    weekday: "long",
  });
  const svg = await satori(markup(title, postDate), ogOptions);

  // Проверяем, запрашивает ли пользователь PNG
  if (context.url.pathname.endsWith(".png")) {
    const png = new Resvg(svg).render().asPng();
    return new Response(png, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": "image/png",
      },
    });
  }

  // Проверяем, запрашивает ли пользователь SVG
  if (context.url.pathname.endsWith(".svg")) {
    return new Response(svg, {
      headers: {
        "Cache-Control": "public, max-age=31536000",
        "Content-Type": "image/svg+xml; charset=utf-8",
      },
    });
  }

  // Если запрос не заканчивается на .png или .svg, возвращаем ошибку
  return new Response("Unsupported format", { status: 400 });
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return posts
    .filter(({ data }) => !data.ogImage)
    .flatMap((post) => {
      return [
        {
          params: { slug: post.id, ext: "png" },
          props: {
            pubDate: post.data.updatedDate ?? post.data.publishDate,
            title: post.data.title,
          },
        },
        {
          params: { slug: post.id, ext: "svg" },
          props: {
            pubDate: post.data.updatedDate ?? post.data.publishDate,
            title: post.data.title,
          },
        },
      ];
    });
}
