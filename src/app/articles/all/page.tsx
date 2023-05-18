//LAYOUT, COMPONENTS
import MainLayout from "_@/layouts/MainLayout";
import ContentLayout from "_@/layouts/ContentLayout";
import Filter from "_@/app/articles/all/components/Fillter";
import TableComponent from "_@/app/articles/all/components/Table";
//HOOK
import { getDataArticle } from "_@/server/api";

export default async function Page() {
  const data = await getDataArticle();

  return (
    <MainLayout>
      <ContentLayout filter={<Filter />}>
        <TableComponent
          total={data?.totalPages || 0}
          data={data?.content || []}
        />
      </ContentLayout>
    </MainLayout>
  );
}
