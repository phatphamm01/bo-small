//THIRD PARTY MODULES
import axios from "axios";
//HOOK
//proxy fetch data

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const reqHeaders = request.headers;
  const headers = {
    "Content-Type": "application/json",
    Authorization: reqHeaders.get("Authorization"),
  };

  const { url, method, params } = data;
  console.log({ url, method, params, headers });

  //   return NextResponse.json({
  //     data: "invalid method",
  //   });

  if (!url)
    return NextResponse.json({
      data: "no url",
    });

  //check url is valid
  const isUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
  if (!isUrl)
    return NextResponse.json({
      data: "invalid url",
    });
  //axios
  try {
    switch (method) {
      case "GET": {
        const { data } = await axios.get(url, {
          params,
          headers,
        });
        return NextResponse.json(data);
      }
      case "POST": {
        const { data } = await axios.post(url, params, {
          headers,
        });
        return NextResponse.json(data);
      }

      case "PUT": {
        const { data } = await axios.put(
          url,
          { ...params },
          {
            headers,
          }
        );

        return NextResponse.json(data);
      }
      case "DELETE": {
        const { data } = await axios.delete(url, {
          headers,
        });
        return NextResponse.json(data);
      }
      default:
        return NextResponse.json({
          data: "invalid method",
        });
    }
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({
      isError: true,
      message: error.message,
    });
  }
}
