// CSS module declarations
declare module '*.css' {
  const content: string;
  export default content;
}

// Global CSS side-effect imports
declare module './globals.css';
declare module '../globals.css';
declare module '*/globals.css';