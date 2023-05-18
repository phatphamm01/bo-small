//THIRD PARTY MODULES
import {
  ArticleControllerApi,
  ArticleControllerApiFetchParamCreator,
  UserControllerApi,
} from "_@/swagger/api";

export const articleApi = new ArticleControllerApi();
export const userApi = new UserControllerApi();

// add href: http://14.225.205.235:8080 to fetch param creator
// url: http://14.225.205.235:8080 + url.format(localVarUrlObj),
// options: localVarRequestOptions,

const articleControllerApiFetchParamCreator =
  ArticleControllerApiFetchParamCreator();

// eslint-disable-next-line @typescript-eslint/ban-types
const objectKeys = <T extends Object>(o: T) => Object.keys(o) as (keyof T)[];

export const articleCreator = objectKeys(
  articleControllerApiFetchParamCreator
).reduce((acc, key) => {
  const func = articleControllerApiFetchParamCreator[key];
  return {
    ...acc,
    [key]: (...args: Parameters<typeof func>) => {
      const { url, options } = articleControllerApiFetchParamCreator[key](
        //@ts-ignore
        ...args
      );
      return {
        url: "http://14.225.205.235:8080" + url,
        options,
      };
    },
  };
}, {} as typeof articleControllerApiFetchParamCreator);

//   .map((key) => {
//     const func = articleControllerApiFetchParamCreator[key];
//     return {
//       [key]: (...args: Parameters<typeof func>) => {
//         const { url, options } = articleControllerApiFetchParamCreator[key](
//           //@ts-ignore
//           ...args
//         );
//         return {
//           url: "http://14.225.205.235:8080/" + url,
//           options,
//         };
//       },
//     };
//   })
