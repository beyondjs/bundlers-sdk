# Type Dependency Resolution in Module Packaging

When BeyondJS packages a module, it must not only produce the JavaScript bundle but also the corresponding TypeScript
declaration file (.d.ts). To generate this .d.ts consistently and independently of the consuming application, the module
packager must deterministically select the version of each type dependency used during type generation.

## Compatibility Range

The compatibility range for each dependency is defined by the package that owns the module. This range (e.g., ^3.2.0)
specifies which versions of the dependency are acceptable for both runtime compatibility and type compatibility. It is
declared in the package manifest (package.json) under the appropriate dependency section (dependencies,
peerDependencies, or devDependencies, depending on the context).

Example:

```json
{
	"name": "@scope/example",
	"version": "1.0.0",
	"dependencies": {
		"@scope/lib": "^3.2.0"
	}
}
```

Here, the module is compatible with any @scope/lib version matching >=3.2.0 <4.0.0.

## Why the Packager Must Choose the Version

When a module is packaged in BeyondJS:

-   It is autonomous: the code and the types must remain identical no matter which application consumes it.
-   There is no single dependency tree as in a traditional application build. The module is built in isolation.
-   Therefore, the packager — not the consuming application — is responsible for selecting the exact version of the
    dependency used to generate the .d.ts.

## How the Version is Selected

1. Read the declared compatibility range from the package manifest.
2. Resolve the highest available version within that range at build time.
3. Use that version’s type definitions during the .d.ts generation process.
4. (Optional) Store the resolved version in build metadata to ensure deterministic rebuilds.

## Implications for Consumers

-   The consuming application may have a different version of the dependency at runtime, as long as it falls within the
    declared compatibility range.
-   Because TypeScript types are erased at runtime, what matters is structural compatibility — the shapes of the types
    must match within the declared range.
-   If the consumer’s dependency version is outside the range, type errors or runtime incompatibilities may occur.

## Best Practices

-   Avoid re-exporting third-party types in the module’s public API. Instead, define your own types and map them
    internally.
-   Keep the compatibility range accurate and update it whenever the public type surface changes in a way that affects
    compatibility.
-   Ensure deterministic version selection during packaging to avoid .d.ts drift between builds.
