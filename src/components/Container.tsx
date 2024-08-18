import React, { ReactNode } from "react";

interface ContainerPropsType {
  children: React.ReactNode;
  LoadingConditions?: boolean[];
  RenderingConditions?: boolean[];
  backUpElem?: ReactNode;
  className?: string;
}

const Container = ({
  children,
  LoadingConditions,
  RenderingConditions,
  backUpElem,
  className = "",
}: ContainerPropsType) => {
  const canRender = !RenderingConditions?.includes(false);
  const canLoad = LoadingConditions?.includes(true);

  return canLoad ? (
    <h1 className="text-3xl text-center font-semibold">Loading...</h1>
  ) : canRender ? (
    <div className={className}>{children}</div>
  ) : (
    backUpElem
  );
};

export default Container;
