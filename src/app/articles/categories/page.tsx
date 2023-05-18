//LAYOUT, COMPONENTS
import MainLayout from "_@/layouts/MainLayout";
import ContentLayout from "_@/layouts/ContentLayout";
import DialogComp from "_@/app/articles/categories/components/Dialog";
import TableComponent from "_@/app/articles/categories/components/Table";
//HOOK
import { getDataCate } from "_@/server/api";

export default async function Page() {
  const data = await getDataCate();

  return (
    <MainLayout>
      <ContentLayout rightAction={<DialogComp />}>
        <TableComponent data={data} />
      </ContentLayout>
    </MainLayout>
  );
}
