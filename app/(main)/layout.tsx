import { Header } from "../../components/header/header";
import S from "./main.module.scss";
interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <header className={S.header}>
        <Header />
      </header>
      <main>{children}</main>
    </>
  );
}
