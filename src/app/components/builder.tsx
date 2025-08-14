import Link from "next/link";
import React, { JSX } from "react";
import {
  FaClipboardList,
  FaClock,
  FaDiagramProject,
  FaFile,
  FaFileContract,
  FaFileInvoiceDollar,
  FaUsersGear,
  FaUserTie,
} from "react-icons/fa6";

interface Node {
  _id: string;
  key: string;
  component: string;
  props?: {
    className?: string;
    href?: string;
  };
  params?: {
    variant?: string;
    text?: string;
    icon?: string;
  };
  children?: Node[];
}

interface BuilderProps {
  node: Node;
}

const getIcon = (iconName?: string, className: string = ""): JSX.Element => {
  const iconMap: Record<string, JSX.Element> = {
    clock: <FaClock className={className} />,
    "diagram-project": <FaDiagramProject className={className} />,
    "file-invoice-dollar": <FaFileInvoiceDollar className={className} />,
    "user-tie": <FaUserTie className={className} />,
    "file-contract": <FaFileContract className={className} />,
    "clipboard-list": <FaClipboardList className={className} />,
    "users-gear": <FaUsersGear className={className} />,
  };

  return iconName ? iconMap[iconName] : <FaFile className={className} />;
};

const Builder: React.FC<BuilderProps> = ({ node }) => {
  const { component, children, params, props } = node;
  const className = props?.className || "";

  switch (component) {
    case "icon":
      return getIcon(params?.icon, className);
    case "text":
      const text = params?.text;
      switch (params?.variant) {
        case "h1":
          return <h1 className={className}>{text}</h1>;
        case "h3":
          return <h3 className={className}>{text}</h3>;
        case "p":
          return <p className={className}>{text}</p>;
        default:
          return <span className={className}>{text}</span>;
      }
    case "link":
      return (
        <Link href={props?.href || "#"} className={className}>
          {children?.length
            ? children.map((child) => <Builder key={child.key} node={child} />)
            : params?.text}
        </Link>
      );
    case "block":
    default:
      return (
        <div className={className}>
          {children?.map((child) => (
            <Builder key={child.key} node={child} />
          ))}
        </div>
      );
  }
};

export default Builder;
