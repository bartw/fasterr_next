import React from "react";
import Head from "next/head";
import Link from "next/link";

const Layout = ({ title, nav, children }) => (
  <>
    <Head>
      <title>Fasterr - {title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mt-4 mb-6 flex">
          <Link href="/">
            <a>
              <h1 className="text-4xl">Fasterr</h1>
            </a>
          </Link>
          <div className="flex-1"></div>
          {nav}
        </header>
        <main>{children}</main>
      </div>
    </div>
  </>
);

export default Layout;
