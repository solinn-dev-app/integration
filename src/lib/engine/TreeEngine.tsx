'use client';

import React, { useEffect, useState } from 'react';
import { TreeRenderer } from '../components/TreeRenderer';
import treeData from '../data/tree.json';

interface TreeNode {
  _id: string;
  key: string;
  component: string;
  props?: Record<string, unknown>;
  params?: Record<string, unknown>;
  children?: TreeNode[];
}

export const TreeEngine: React.FC = () => {
  const [data, setData] = useState<TreeNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simulate loading delay to show loading state
      setTimeout(() => {
        setData(treeData as TreeNode);
        setLoading(false);
      }, 100);
    } catch {
      setError('Failed to load tree data');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">No data available</div>
      </div>
    );
  }

  return <TreeRenderer node={data} />;
};
