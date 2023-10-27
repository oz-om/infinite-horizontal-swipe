import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    external: ["react", "react-dom"],
    plugins: [
      babel({
        exclude: "node_modules/**", // only transpile our source code
        babelHelpers: "bundled",
      }),
      resolve(),
      commonjs(),
    ],
  },
];
