/**
 * Processor, Source and Bundle are objects that are exposed globally
 * in lib/engine/process/core/global/index.js
 *
 * The registry is created in lib/engine/process/core/index.js, and exposed globally
 * in lib/engine/process/core/global/index.js
 */

const Dependency = require('@beyond-js/bundlers-sdk/dependencies/dependency');
const DependenciesPropagator = require('@beyond-js/bundlers-sdk/dependencies/propagator');
const Bundle = require('@beyond-js/bundlers-sdk/bundle');
const BundlePackager = require('@beyond-js/bundlers-sdk/bundle/packager');
const BundleCodeBase = require('@beyond-js/bundlers-sdk/bundle/packager/code/base');
const BundleJsCode = require('@beyond-js/bundlers-sdk/bundle/packager/code/js');
const BundleCssCode = require('@beyond-js/bundlers-sdk/bundle/packager/code/css');
const BundleDependencies = require('@beyond-js/bundlers-sdk/bundle/packager/dependencies');
const Bundles = require('@beyond-js/bundlers-sdk/bundles');
const TxtBundle = require('@beyond-js/bundlers-sdk/txt/bundle');
const TxtTransversal = require('@beyond-js/bundlers-sdk/txt/transversal');
const Transversal = require('@beyond-js/bundlers-sdk/transversal');
const TransversalDependencies = require('@beyond-js/bundlers-sdk/transversal/packager/dependencies');
const TransversalPackager = require('@beyond-js/bundlers-sdk/transversal/packager');
const TransversalCodePackager = require('@beyond-js/bundlers-sdk/transversal/packager/code');
const ProcessorBase = require('@beyond-js/bundlers-sdk/processor/base');
const ProcessorSourcesDependencies = require('@beyond-js/bundlers-sdk/processor/base/dependencies/sources');
const ProcessorHashes = require('@beyond-js/bundlers-sdk/processor/base/hashes');
const ProcessorSources = require('@beyond-js/bundlers-sdk/processor/base/sources');
const ProcessorSourcesHashes = require('@beyond-js/bundlers-sdk/processor/base/sources/hashes');
const ProcessorSource = require('@beyond-js/bundlers-sdk/processor/source');
const ProcessorCompiledSource = require('@beyond-js/bundlers-sdk/processor/source/compiled');
const ProcessorOptions = require('@beyond-js/bundlers-sdk/processor/base/sources/options');
const ProcessorAnalyzer = require('@beyond-js/bundlers-sdk/processor/base/analyzer');
const ProcessorSinglyAnalyzer = require('@beyond-js/bundlers-sdk/processor/base/analyzer/singly');
const ProcessorAnalyzerSource = require('@beyond-js/bundlers-sdk/processor/base/analyzer/source');
const ProcessorAnalyzerDependencies = require('@beyond-js/bundlers-sdk/processor/base/dependencies/analyzer');
const ProcessorPackager = require('@beyond-js/bundlers-sdk/processor/packager');
const ProcessorCompiler = require('@beyond-js/bundlers-sdk/processor/packager/compiler');
const ProcessorSinglyCompiler = require('@beyond-js/bundlers-sdk/processor/packager/compiler/singly');
const ProcessorCompilerChildren = require('@beyond-js/bundlers-sdk/processor/packager/compiler/children');
const ProcessorCode = require('@beyond-js/bundlers-sdk/processor/packager/code');
const ProcessorSinglyCode = require('@beyond-js/bundlers-sdk/processor/packager/code/singly');
const ProcessorDeclaration = require('@beyond-js/bundlers-sdk/processor/packager/declaration');
const ProcessorsExtender = require('@beyond-js/bundlers-sdk/processor/extender');
const ProcessorsExtenderPreprocessor = require('@beyond-js/bundlers-sdk/processor/extender/preprocessor');
const ProcessorsExtenderSinglyPreprocessor = require('@beyond-js/bundlers-sdk/processor/extender/preprocessor/singly');
const SourceMap = require('@beyond-js/bundlers-sdk/source-map');

module.exports = new (class {
	get Dependency() {
		return Dependency;
	}

	get DependenciesPropagator() {
		return DependenciesPropagator;
	}

	get Bundle() {
		return Bundle;
	}

	get BundlePackager() {
		return BundlePackager;
	}

	get BundleCodeBase() {
		return BundleCodeBase;
	}

	get BundleJsCode() {
		return BundleJsCode;
	}

	get BundleCssCode() {
		return BundleCssCode;
	}

	get BundleDependencies() {
		return BundleDependencies;
	}

	get Bundles() {
		return Bundles;
	}

	get TxtBundle() {
		return TxtBundle;
	}

	get TxtTransversal() {
		return TxtTransversal;
	}

	get Transversal() {
		return Transversal;
	}

	get TransversalDependencies() {
		return TransversalDependencies;
	}

	get TransversalPackager() {
		return TransversalPackager;
	}

	get TransversalCodePackager() {
		return TransversalCodePackager;
	}

	get ProcessorBase() {
		return ProcessorBase;
	}

	get ProcessorSourcesDependencies() {
		return ProcessorSourcesDependencies;
	}

	get ProcessorHashes() {
		return ProcessorHashes;
	}

	get ProcessorSources() {
		return ProcessorSources;
	}

	get ProcessorSourcesHashes() {
		return ProcessorSourcesHashes;
	}

	get ProcessorSource() {
		return ProcessorSource;
	}

	get ProcessorCompiledSource() {
		return ProcessorCompiledSource;
	}

	get ProcessorOptions() {
		return ProcessorOptions;
	}

	get ProcessorAnalyzer() {
		return ProcessorAnalyzer;
	}

	get ProcessorSinglyAnalyzer() {
		return ProcessorSinglyAnalyzer;
	}

	get ProcessorAnalyzerSource() {
		return ProcessorAnalyzerSource;
	}

	get ProcessorAnalyzerDependencies() {
		return ProcessorAnalyzerDependencies;
	}

	get ProcessorPackager() {
		return ProcessorPackager;
	}

	get ProcessorCompiler() {
		return ProcessorCompiler;
	}

	get ProcessorSinglyCompiler() {
		return ProcessorSinglyCompiler;
	}

	get ProcessorCompilerChildren() {
		return ProcessorCompilerChildren;
	}

	get ProcessorCode() {
		return ProcessorCode;
	}

	get ProcessorSinglyCode() {
		return ProcessorSinglyCode;
	}

	get ProcessorDeclaration() {
		return ProcessorDeclaration;
	}

	get ProcessorsExtender() {
		return ProcessorsExtender;
	}

	get ProcessorsExtenderPreprocessor() {
		return ProcessorsExtenderPreprocessor;
	}

	get ProcessorsExtenderSinglyPreprocessor() {
		return ProcessorsExtenderSinglyPreprocessor;
	}

	get SourceMap() {
		return SourceMap;
	}
})();
