//THIRD PARTY MODULES
import { userApi } from "_@/swagger";
import { getUrlOnServer } from "_@/utils/getUrlOnServer";
//LAYOUT, COMPONENTS
import MainLayout from "_@/layouts/MainLayout";
import ContentLayout from "_@/layouts/ContentLayout";
import TableComponent from "_@/app/users/all/components/Table";

const getData = async () => {
  const url = getUrlOnServer();
  const search = url.searchParams?.get("search") || undefined;
  try {
    const res = await userApi.getAllUser(undefined, search);

    return res.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export default async function Page() {
  const data = await getData();

  return (
    <MainLayout>
      <ContentLayout rightAction={null}>
        <TableComponent data={data} />
      </ContentLayout>
    </MainLayout>
  );
}
