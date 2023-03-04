import fetch from "@/utils/fetch";
import ApiUrl from "@/config/api-url";

export async function userLogin(params) {
  return fetch(`${ApiUrl.ManApiUrl}/auth/login`, {
    method: "POST",
    data: params,
  });
}
