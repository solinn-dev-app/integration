import React from 'react';
import { Icon } from './Icon';

interface TreeNode {
  _id: string;
  key: string;
  component: string;
  props?: Record<string, unknown>;
  params?: Record<string, unknown>;
  children?: TreeNode[];
}

interface TreeRendererProps {
  node: TreeNode;
}

export const TreeRenderer: React.FC<TreeRendererProps> = ({ node }) => {
  const renderComponent = (node: TreeNode): React.ReactNode => {
    const { component, props = {}, params = {}, children = [] } = node;

    switch (component) {
      case 'block':
        return (
          <div key={node._id} {...props}>
            {children.map((child) => (
              <TreeRenderer key={child._id} node={child} />
            ))}
          </div>
        );

      case 'text':
        const { variant = 'p', text: textContent = '' } = params as { variant?: string; text?: string };
        const renderTextComponent = () => {
          switch (variant) {
            case 'h1':
              return <h1 key={node._id} {...props}>{textContent}</h1>;
            case 'h2':
              return <h2 key={node._id} {...props}>{textContent}</h2>;
            case 'h3':
              return <h3 key={node._id} {...props}>{textContent}</h3>;
            case 'h4':
              return <h4 key={node._id} {...props}>{textContent}</h4>;
            case 'h5':
              return <h5 key={node._id} {...props}>{textContent}</h5>;
            case 'h6':
              return <h6 key={node._id} {...props}>{textContent}</h6>;
            case 'p':
            default:
              return <p key={node._id} {...props}>{textContent}</p>;
          }
        };
        return renderTextComponent();

      case 'link':
        const { href = '#', text: linkText = '' } = params as { href?: string; text?: string };
        return (
          <a key={node._id} href={href} {...props}>
            {linkText}
            {children.map((child) => (
              <TreeRenderer key={child._id} node={child} />
            ))}
          </a>
        );

      case 'icon':
        const { icon = '' } = params as { icon?: string };
        return (
          <Icon key={node._id} name={icon} {...props} />
        );

      default:
        console.warn(`Unknown component type: ${component}`);
        return null;
    }
  };

  return renderComponent(node);
};
