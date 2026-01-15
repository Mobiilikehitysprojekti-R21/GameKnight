module.exports = {
  forbidden: [],
  options: {
    exclude: [
      "(^|/)node_modules(/|$)",
      "^dist$",
      "^build$",
      "^coverage$",
      "^\\.git$",
    ],
    doNotFollow: {
      path: "^(node_modules|dist|build|coverage)",
      dependencyTypes: ["npm", "npm-dev", "npm-optional"],
    },
    tsConfig: { fileName: "tsconfig.json" },
    reporterOptions: {
      dot: {
        collapsePattern:
          "^(./(domain|application|interfaces|infrastructure|ports)).*",
        theme: {
          graph: {
            rankdir: "TB",
            bgcolor: "transparent",
          },
          modules: [
            {
              criteria: { source: "./domain" },
              attributes: { fillcolor: "#ffeaa7" },
            },
            {
              criteria: { source: "./application" },
              attributes: { fillcolor: "#fab1a0" },
            },
            {
              criteria: { source: "./interfaces" },
              attributes: { fillcolor: "#74b9ff" },
            },
            {
              criteria: { source: "./infrastructure" },
              attributes: { fillcolor: "#a29bfe" },
            },
            {
              criteria: { source: "./ports" },
              attributes: { fillcolor: "#a29bfe" },
            },
          ],
        },
      },
    },
  },
};
