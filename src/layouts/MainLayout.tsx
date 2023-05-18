//THIRD PARTY MODULES
import Side from "_@/ui/Side";

type Props = React.PropsWithChildren;

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Side className="w-[268px] shrink-0 bg-teal-950  px-4 py-6" />
      <div className="h-screen w-full grow overflow-scroll">{children}</div>
    </div>
  );
}
