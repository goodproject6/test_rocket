import React, { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/store';
import DashboardLoader from '../../components/DashboardLoader';
import { useRouter } from 'next/navigation';

interface MiddlewareProps {
  children?: ReactNode;
}

const Middleware: React.FC<MiddlewareProps> = ({ children }) => {
  const { isAuthenticated, isLoadingUser } = useAppSelector((state) => state.auth);
  const router = useRouter();


  const [isInitialVisit, setIsInitialVisit] = useState(true);

  useEffect(() => {
    const handleNavigation = async () => {
      if (!isAuthenticated && !isLoadingUser) {
        router.push('/');
      } else {
        setIsInitialVisit(false);
      }
    };

    if (isInitialVisit) {
      handleNavigation();
    }
  }, [isAuthenticated, isLoadingUser, isInitialVisit, router]);


  if (isLoadingUser || (isInitialVisit && isAuthenticated)) {
    return <DashboardLoader />;
  }



  return <>{children}</>;
};

export default Middleware;
