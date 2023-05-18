//THIRD PARTY MODULES
import Image from "next/image";
import { UserDto } from "_@/swagger/api";

// export interface UserDto {
//   /**
//    *
//    * @type {number}
//    * @memberof UserDto
//    */
//   id?: number;
//   /**
//    *
//    * @type {string}
//    * @memberof UserDto
//    */
//   username?: string;
//   /**
//    *
//    * @type {string}
//    * @memberof UserDto
//    */
//   email?: string;
//   /**
//    *
//    * @type {string}
//    * @memberof UserDto
//    */
//   name?: string;
//   /**
//    *
//    * @type {string}
//    * @memberof UserDto
//    */
//   image?: string;
//   /**
//    *
//    * @type {string}
//    * @memberof UserDto
//    */
//   role?: string;
//   /**
//    *
//    * @type {string}
//    * @memberof UserDto
//    */
//   bio?: string;
//   /**
//    *
//    * @type {number}
//    * @memberof UserDto
//    */
//   followers?: number;
//   /**
//    *
//    * @type {Array<CategoryDto>}
//    * @memberof UserDto
//    */
//   categories?: Array<CategoryDto>;
//   /**
//    *
//    * @type {number}
//    * @memberof UserDto
//    */
//   amountArticle?: number;
//   /**
//    *
//    * @type {boolean}
//    * @memberof UserDto
//    */
//   _new?: boolean;
//   /**
//    *
//    * @type {boolean}
//    * @memberof UserDto
//    */
//   contentCreator?: boolean;
// }

export default function Writers({ data }: { data: UserDto[] | undefined }) {
  return (
    <div className="writers space-y-6 rounded-xl bg-white px-7 py-4">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-500">Writers</span>
        </div>
        <span className="text-12 font-normal text-gray-500">
          Top 4 article writers
        </span>
      </div>
      <div className="grid gap-6">
        {data?.slice(0, 4)?.map((item) => (
          <div
            className="grid grid-cols-[1fr_5fr_2fr] items-center space-x-6"
            key={item.id}
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={item.image || "/images/avatar.png"}
                alt=""
                fill
                unoptimized
              />
            </div>
            <div className="flex h-full flex-col justify-between">
              <span className="text-14 font-bold text-gray-900">
                {item.name}
              </span>
              <span className="text-12 text-gray-500">{item.email}</span>
            </div>
            <div className="flex h-full flex-col items-end justify-between">
              <span className="text-14 font-medium text-gray-900">
                {item.amountArticle}
              </span>
              <span className="text-12 text-gray-500">{item.followers}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
