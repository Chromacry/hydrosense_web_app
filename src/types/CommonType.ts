import { ReactNode } from "react";

export type NodeProps = {
  children?: ReactNode;
  transparent?: boolean;
  imageSize?: string;
  handleLogout?: () => void;
};
