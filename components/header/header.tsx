import React from "react";
import S from "./header.module.scss";
import Link from "next/link";
interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <div className={S.header}>
      <Link href="/?page=1">
        <h1 className={S.logo}>LOGO</h1>
      </Link>
    </div>
  );
};
