import fetch from "@/utils/fetch";
import ApiUrl from "@/config/api-url";

export async function queryArticleList({ pageNo = 1, pageSize = 10 } = {}) {
  return fetch(`${ApiUrl.ManApiUrl}/article/pages`, {
    method: "GET",
    params: {
      pageNo,
      pageSize,
    },
  });
}
