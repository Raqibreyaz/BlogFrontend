import React, { ReactNode, useCallback } from "react";
import { useGetUserQuery } from "../store/userApi";
import Container from "./Container";
import { Login, NotFoundPage } from "../pages";

interface AuthenticattionProps {
  children: ReactNode;
  authState?: boolean;
  allowed?: boolean;
}

const Authenticate: React.FC<AuthenticattionProps> = ({
  children,
  authState = false,
  allowed = false,
}) => {
  const { data: { user } = {}, isLoading: isGettingUser } = useGetUserQuery();

  const isAuthenticated = !!user;
  
  const RenderingCode = () => {
    if (!allowed && authState !== isAuthenticated) {
      return isAuthenticated ? <NotFoundPage /> : <Login />;
    } else {
      return <div>{children}</div>;
    }
  };
  return (
    <Container LoadingConditions={[isGettingUser]}>
      {!isGettingUser && <RenderingCode />}
    </Container>
  );
};

export default Authenticate;
