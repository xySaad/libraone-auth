// Svelte component declarations
declare module "*.svelte" {
  import type { Component } from "svelte";
  const component: Component;
  export default component;
}

// CSS module declarations
declare module "*.css" {
  const styles: Record<string, string>;
  export default styles;
}
