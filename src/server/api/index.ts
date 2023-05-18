//THIRD PARTY MODULES
import { articleApi } from "_@/swagger";
import { getUrlOnServer } from "_@/utils/getUrlOnServer";

export const getDataArticle = async () => {
  const url = getUrlOnServer();
  const page = Number(url?.searchParams?.get("page")) - 1 || 0;
  const search = url?.searchParams?.get("search") || "";
  const limit = Number(url?.searchParams?.get("limit") || 10);
  let status = url?.searchParams?.get("status") || "";
  status === "ALL" && (status = "");
  // Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.

  const sort = url?.searchParams
    ?.getAll("sort")
    .map((item) => decodeURIComponent(item));

  try {
    const res = await articleApi.findAllArticlePagingV2(
      page,
      limit,
      sort,
      search,
      status
    );

    return res.data;
  } catch (error) {
    console.log({ error });
  }
};

export const getDataCate = async () => {
  const url = getUrlOnServer();
  const search = url?.searchParams?.get("search") || "";

  try {
    const res = await articleApi.getAllCate(search, {
      cache:
        //no cache
        "no-cache",
    });

    return res.data;
  } catch (error) {
    return [];
  }
};
