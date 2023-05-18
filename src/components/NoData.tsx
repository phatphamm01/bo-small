//THIRD PARTY MODULES
import styled from "_@/utils/styled";
import NoDataIcon from "_@/icons/NoDataIcon";

type Props = {
  message?: string;
  icon?: JSX.Element;
  wrapperStyles?: string;
};

const NoData = ({
  message = "There are no data",
  icon = <NoDataIcon />,
  wrapperStyles = "",
}: Props) => {
  return (
    <NoDataWrapper className={wrapperStyles}>
      {icon}
      <NoDataText>{message}</NoDataText>
    </NoDataWrapper>
  );
};

export default NoData;

const NoDataWrapper = styled("div", "flex items-center flex-col my-20");
const NoDataText = styled("div", "mt-10 text-sm text-w3-gray-500");
