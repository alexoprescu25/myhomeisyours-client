import { Suspense, type FC } from "react";

import { BrowserRouter, Routes, Route, type RouteComponentProps } from "react-router-dom";

import { SignIn, PrivateRoute } from "views/auth";
import Property from "views/account/properties/public/Property";

import { ErrorFallback, Loader, Snackbar } from "components/shared";
import { ErrorBoundary } from "react-error-boundary";

import { myAccountRoutes } from "routes";

const App: FC = () => {
  const fallbackRender = ({error}: {error: Error}) => {
    console.error(error);
    return <ErrorFallback />;
  }

  return (
    <ErrorBoundary fallbackRender={ fallbackRender }>
      <BrowserRouter>
        <Snackbar />
        <Suspense fallback={ <Loader /> }>
          <Routes>
            <Route exact path="/" element={ <SignIn /> } />
            <Route path="/signin" element={ <SignIn /> } />
            <Route path="/public/property/:propertyId" element={ <Property /> } />
            <Route path="/dashboard" element={ <PrivateRoute /> }>
              { myAccountRoutes.map((route: RouteComponentProps, index: number) => (
                  <Route 
                    key={ index } 
                    index={ route.index }
                    exact={ route.exact }
                    path={ typeof route.path === 'function' ? route.path() : route.path } 
                    element={ <route.component /> } 
                  />
                )) }
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App;