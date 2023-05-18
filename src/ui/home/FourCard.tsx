//THIRD PARTY MODULES
import { ArticleReportDto } from "_@/swagger/api";
//LAYOUT, COMPONENTS
import Card, { CardProps } from "_@/app/components/Card";

// export interface ArticleReportDto {
//     /**
//      *
//      * @type {number}
//      * @memberof ArticleReportDto
//      */
//     totalArticleInMonth?: number;
//     /**
//      *
//      * @type {number}
//      * @memberof ArticleReportDto
//      */
//     totalArticleInPreviousMonth?: number;
//     /**
//      *
//      * @type {number}
//      * @memberof ArticleReportDto
//      */
//     articleIsPrevious?: number;
//     /**
//      *
//      * @type {number}
//      * @memberof ArticleReportDto
//      */
//     totalNewUserInMonth?: number;
//     /**
//      *
//      * @type {number}
//      * @memberof ArticleReportDto
//      */
//     totalNewUserInPreviousMonth?: number;
//     /**
//      *
//      * @type {number}
//      * @memberof ArticleReportDto
//      */
//     userIsPrevious?: number;
//   }

type FourCardProps = {
  data: ArticleReportDto | undefined;
};

export default function FourCard({ data }: FourCardProps) {
  const dataRender: CardProps[] = data
    ? [
        {
          title: "TOTAL POSTS",
          value: data.totalArticleInMonth || 0,
          percentage: data.articleIsPrevious || 14,
        },
        {
          //tổng số lượt xem bài viết
          title: "TOTAL VIEWS",
          value: 402,
          percentage: -32,
        },
        {
          title: "TOTAL GUEST",
          value: 12,
          percentage: 14,
        },
        {
          title: "TOTAL CUSTOMERS",
          value: data.totalNewUserInMonth || 0,
          percentage: 20,
        },
      ]
    : [];
  return (
    <div className="four-card flex space-x-4">
      {dataRender.map((item) => (
        <Card className="w-full grow" key={item.title} {...item} />
      ))}
    </div>
  );
}
