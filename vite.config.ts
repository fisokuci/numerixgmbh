import { defineConfig, loadEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve";
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: '/',

    server: {
      host: "::",
      port: 8080,
      fs: {
        allow: ["./client", "./shared"],
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
      },
    },

    build: {
      outDir: "dist",
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },

    plugins: [
      react(),
      cookiebotHtmlPlugin({
        enabled: env.COOKIEBOT_ENABLED,
        cbid: env.COOKIEBOT_CBID,
        culture: env.COOKIEBOT_CULTURE,
        blockingMode: env.COOKIEBOT_BLOCKING_MODE,
      }),
      ...(isDev ? [expressPlugin()] : []),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client"),
        "@shared": path.resolve(__dirname, "./shared"),
      },
    },
  };
});

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}

function cookiebotHtmlPlugin(options: {
  enabled?: string;
  cbid?: string;
  culture?: string;
  blockingMode?: string;
}): Plugin {
  const enabled = options.enabled?.trim().toLowerCase() === "true";
  const cbid = options.cbid?.trim();
  const culture = options.culture?.trim();
  const blockingMode = options.blockingMode?.trim().toLowerCase();

  return {
    name: "cookiebot-html-plugin",
    transformIndexHtml(html) {
      if (!enabled || !cbid) return html;

      if (blockingMode === "auto") {
        console.warn(
          "COOKIEBOT_BLOCKING_MODE=auto is ignored because it would block the SPA bootstrap script.",
        );
      }

      const scriptLoader = [
        "    <script>",
        '      (function () {',
        '        var hostname = window.location.hostname;',
        '        var isLocal = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";',
        "        if (isLocal) return;",
        '        var script = document.createElement("script");',
        `        script.id = "Cookiebot";`,
        `        script.src = "https://consent.cookiebot.com/uc.js";`,
        `        script.type = "text/javascript";`,
        "        script.async = true;",
        `        script.setAttribute("data-cbid", "${escapeJsString(cbid)}");`,
        ...(culture
          ? [
              `        script.setAttribute("data-culture", "${escapeJsString(culture)}");`,
            ]
          : []),
        "        document.head.appendChild(script);",
        "      })();",
        "    </script>",
      ].join("\n");

      return html.replace("</head>", `${scriptLoader}\n  </head>`);
    },
  };
}

function escapeJsString(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
}
