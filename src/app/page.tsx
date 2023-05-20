//THIRD PARTY MODULES
import Article from "_@/ui/home/Article";
import Writers from "_@/ui/home/Writers";
import FourCard from "_@/ui/home/FourCard";
import TotalPost from "_@/ui/home/TotalPost";
import { articleApi, userApi } from "_@/swagger";
import TrafficSources from "_@/ui/home/TrafficSources";
//LAYOUT, COMPONENTS
import MainLayout from "_@/layouts/MainLayout";
//RELATIVE MODULES
import "./styles.css";

// get now day for format YYYY-MM-DD
const getDay = () => {
  const day = Date.now();
  const date = new Date(day);
  const year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  //handle add 0 if month < 10
  month = month < 10 ? `0${month}` : month;
  const dayNow = date.getDate();

  return `${year}-${month}-${dayNow}`;
};

const getReportUser = async () => {
  const res = await articleApi.getReportUser(getDay());
  return res.data;
};

const getTopWriter = async () => {
  const res = await userApi.getUserReport(getDay());
  return res.data;
};

const getArticleTopTime = async () => {
  const res = await articleApi.findAllArticlePagingV2(0, 4, ["createdAt,desc"]);
  return res.data?.content;
};

export default async function Page() {
  const reportUser = await getReportUser();
  const topWriter = await getTopWriter();
  const articleTopTime = await getArticleTopTime();

  console.log(articleTopTime);

  return (
    <MainLayout>
      <div className="layout grid w-full gap-4 px-10 py-6">
        <FourCard data={reportUser} />
        <TotalPost />
        <TrafficSources />
        <Article data={articleTopTime} />
        <Writers data={topWriter} />
      </div>
    </MainLayout>
  );
}
