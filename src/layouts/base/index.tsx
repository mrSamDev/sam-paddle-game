import { PropsWithChildren } from "react";
import { Header } from "../../components/organisms/header";
import { Footer } from "../../components/organisms/footer";

type Props = {
  basicLayout?: boolean;
} & PropsWithChildren;

export default function BaseLayout({ children, basicLayout }: Props) {
  return (
    <div className="min-h-screen bg-main flex flex-col">
      <Header basicLayout={basicLayout} />
      <main className="p-8 md:p-20">{children}</main>
      <Footer />
    </div>
  );
}
