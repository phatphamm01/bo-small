"use client";
//THIRD PARTY MODULES
import { toast } from "react-toastify";
import { articleApi } from "_@/swagger";
import { useRouter } from "next/navigation";
//LAYOUT, COMPONENTS
import { constant } from "_@/app/articles/all/components/constans";
import Select, { SelectTrigger, SelectValue } from "_@/components/Select";
//HOOK

const tagColor: Record<string, string> = {
  CREATE: "bg-blue-100 text-blue-800",
  APPROVE: "bg-green-100 text-green-800",
  DELETE: "bg-red-100 text-red-800",
  DRAFT: "bg-yellow-100 text-yellow-800",
  DENY: "bg-red-100 text-red-800",
};

const ChangeStatus = ({ row }: any) => {
  const router = useRouter();
  const value = row.getValue();

  return (
    <Select
      key={row.row.original.id}
      defaultValue={row.getValue()?.toString()}
      data={constant.map((val) => ({
        id: val,
        name: val,
        value: val,
      }))}
      onValueChange={(value) => {
        const id = row.row.original.id;
        if (!id) return;
        articleApi.changeStatusArticle(id, value).then((res) => {
          if (res.data) {
            router.refresh();
            toast.success("Thay đổi trạng thái thành công");
          } else {
            toast.error("Thay đổi trạng thái thất bại");
          }
        });
      }}
    >
      <SelectTrigger>
        <div
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            value && tagColor[value]
          }`}
        >
          <SelectValue />
        </div>
      </SelectTrigger>
    </Select>
  );
};

export default ChangeStatus;
