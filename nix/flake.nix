{
  description = "throwparty/docusaurus-contrib";
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/release-26.05";
    throwparty = {
      url = "git+ssh://git@github.com/throwparty/nix";
      inputs.flake-utils.follows = "flake-utils";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };
  outputs =
    {
      flake-utils,
      nixpkgs,
      throwparty,
      self,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [
            throwparty.overlays.default
          ];
        };
        inherit (pkgs) mkShell;
        inherit (pkgs.lib) getExe getExe';
      in
      {
        devShells.default =
          let
            inherit (throwparty.devShells.${system})
              commonTools
              githubActions
              nodejs_24
              shell
              ;
            inherit (throwparty.lib) mergeShells mkToolVersions;
            inherit (pkgs)
              mdformat
              nixfmt
              prettier
              yq-go
              ;
            formatterToolVersions = mkToolVersions {
              inherit pkgs;
              name = "default";
              commands = ''
                ${getExe mdformat} --version
                ${getExe nixfmt} --version
                printf "prettier %s\n" "$(${getExe prettier} --version)"
                printf "yq %s\n" "$(${getExe yq-go} --version 2>/dev/null || true)"
              '';
            };
            formatters = mkShell {
              nativeBuildInputs = [
                mdformat
                nixfmt
                prettier
                yq-go
              ];
              shellHook = "cat ${formatterToolVersions}";
            };
          in
          (mergeShells [
            commonTools
            formatters
            githubActions
            nodejs_24
            shell
          ]);
      }
    );
}
