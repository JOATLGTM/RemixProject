import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import sharedStyles from '~/styles/shared.css'
import Error from '~/components/util/Error'

export function links() {
  return [{ rel: 'stylesheet', href: sharedStyles }]
}

export const meta = () => ({
  charset: 'utf-8',
  title: 'RemixExpenses',
  viewport: 'width=device-width,initial-scale=1'
})

export function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
    </Document>
  );
}

export function CatchBoundary() {
  const caughtResponse = useRouteError();

  return (
    <Document>
      <main>
        <Error title={caughtResponse.statusText}>
          <p>{caughtResponse.data?.message || 'Something went wrong. Please try again later.'}</p>
          <p>Back to <Link to="/"></Link></p>
        </Error>
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document title="An error occured">
      <main>
        <Error title="An error occured">
          <p>{error?.message || 'Something went wrong. Please try again later.'}</p>
          <p>Back to <Link to="/">saftey</Link></p>
        </Error>
      </main>
    </Document>
  );
}