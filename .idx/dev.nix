{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
  ];
  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "sh"
          "-lc"
          "npm run dev -- --port \"$PORT\" --host 0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}