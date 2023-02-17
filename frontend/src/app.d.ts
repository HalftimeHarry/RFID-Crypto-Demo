// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

declare module 'qrcode';

declare module 'svelte-qrcode' {
  export default class QrCode {
    $$prop_def: {
      data: string;
      size?: number;
      level?: 'L' | 'M' | 'Q' | 'H';
      margin?: number;
    };
    $$slot_def: {};
    $on: (name: string, callback: (event?: any) => void) => () => void;
    $set: (props: Partial<{
      data: string;
      size?: number;
      level?: 'L' | 'M' | 'Q' | 'H';
      margin?: number;
    }>) => void;
    $capture_state: () => void;
    $inject_state: (state: any) => void;
    $destroy: () => void;
  };
}
