//THIRD PARTY MODULES
import { userApi } from "_@/swagger";
import { getUrlOnServer } from "_@/utils/getUrlOnServer";
//LAYOUT, COMPONENTS
import MainLayout from "_@/layouts/MainLayout";
import ContentLayout from "_@/layouts/ContentLayout";
import TableComponent from "_@/app/users/roles/components/Table";

const getData = async () => {
  const url = getUrlOnServer();
  const search = url.searchParams?.get("search") || undefined;
  try {
    const res = await userApi.getAllUserWaiting(
      undefined,
      undefined,
      undefined,
      search
    );

    return res.data;
  } catch (error) {
    console.log({ error });
  }
};

export default async function Page() {
  const data = await getData();

  return (
    <MainLayout>
      <ContentLayout rightAction={null}>
        <TableComponent data={data?.content} />
      </ContentLayout>
    </MainLayout>
  );
}
