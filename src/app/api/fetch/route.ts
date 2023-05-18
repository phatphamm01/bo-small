//THIRD PARTY MODULES
import axios from "axios";
//HOOK
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    //param url
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const urlParam = params.get("url");

    if (!urlParam)
      return NextResponse.json({
        data: "no url",
      });

    //check url is valid
    const isUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(urlParam);
    if (!isUrl)
      return NextResponse.json({
        data: "invalid url",
      });
    const html = await axios.get(urlParam);

    return NextResponse.json({
      data: html.data,
    });
  } catch (error) {
    return NextResponse.json({
      data: "error",
    });
  }
}
