"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function DocsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
      }}
    >
      <SwaggerUI url="/api/openapi" />
    </main>
  );
}
