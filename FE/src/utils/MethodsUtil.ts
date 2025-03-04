import axiosIns from "@/plugins/api/axios.ts";
export default class MethodsUtil {
  /**
   * @name: Request API
   * @param {string} url => Đường dẫn api
   * @param {string} method => Phương thức 'POST', 'GET'
   * @param {any} payload =>  Dữ liệu đính kèm api
   * @return {object}
   */
  static requestApiCustom = async (
    url = "",
    method = "GET",
    payload?: any,
    arg?: any
  ) => {
    if (url === undefined) return;
    const data = method === "GET" ? null : payload || null;
    const params = method === "GET" ? payload : null;
    return await axiosIns({
      url,
      method,
      data,
      params,
      ...arg,
    })
      .then((res: any) => {
        // eslint-disable-next-line promise/no-return-wrap
        return Promise.resolve({
          status: res?.status,
          data: res?.data?.data ?? res?.data,
          errors: res?.data?.errors ?? res?.errors ?? null,
          message:
            res?.data?.data?.message ??
            res?.data?.message ??
            MethodsUtil.checkMessage(res?.status),
          code:
            res?.data?.code ?? [201, 204].includes(res?.status)
              ? 200
              : res?.status,
        });
      })
      .catch((err: any) => {
        // eslint-disable-next-line promise/no-return-wrap
        return Promise.reject(err);
      });
  };

  /**
   * @name: Request API
   * @param {string} url => Đường dẫn api
   * @param {string} method => Phương thức 'POST', 'GET'
   * @param {any} payload =>  Dữ liệu đính kèm api
   * @return {object}
   */

  static checkMessage = (status: number) => {
    switch (status) {
      case 204:
        return "update-success";
      case 201:
        return "success-create";
      default:
        return "error-create";
    }
  };
}
