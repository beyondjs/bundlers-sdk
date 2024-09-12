/**
 * Processor, Source and Bundle are objects that are exposed globally
 * in lib/engine/process/core/global/index.js
 *
 * The registry is created in lib/engine/process/core/index.js, and exposed globally
 * in lib/engine/process/core/global/index.js
 */

const Dependency = require('./dependencies/dependency');
const DependenciesPropagator = require('./dependencies/propagator');
const Bundle = require('./bundle');
const BundlePackager = require('./bundle/packager');
const BundleCodeBase = require('./bundle/packager/code/base');
const BundleJsCode = require('./bundle/packager/code/js');
const BundleCssCode = require('./bundle/packager/code/css');
const BundleDependencies = require('./bundle/packager/dependencies');
const Bundles = require('./bundles');
const BundlesConfig = require('./bundles/config');
const TxtBundle = require('./txt/bundle');
const TxtTransversal = require('./txt/transversal');
const Transversal = require('./transversal');
const TransversalDependencies = require('./transversal/packager/dependencies');
const TransversalPackager = require('./transversal/packager');
const TransversalCodePackager = require('./transversal/packager/code');
const ProcessorBase = require('./processor/base');
const ProcessorSourcesDependencies = require('./processor/base/dependencies/sources');
const ProcessorHashes = require('./processor/base/hashes');
const ProcessorSources = require('./processor/base/sources');
const ProcessorSourcesHashes = require('./processor/base/sources/hashes');
const ProcessorSource = require('./processor/source');
const ProcessorCompiledSource = require('./processor/source/compiled');
const ProcessorOptions = require('./processor/base/sources/options');
const ProcessorAnalyzer = require('./processor/base/analyzer');
const ProcessorSinglyAnalyzer = require('./processor/base/analyzer/singly');
const ProcessorAnalyzerSource = require('./processor/base/analyzer/source');
const ProcessorAnalyzerDependencies = require('./processor/base/dependencies/analyzer');
const ProcessorPackager = require('./processor/packager');
const ProcessorCompiler = require('./processor/packager/compiler');
const ProcessorSinglyCompiler = require('./processor/packager/compiler/singly');
const ProcessorCompilerChildren = require('./processor/packager/compiler/children');
const ProcessorCode = require('./processor/packager/code');
const ProcessorSinglyCode = require('./processor/packager/code/singly');
const ProcessorDeclaration = require('./processor/packager/declaration');
const ProcessorsExtender = require('./processor/extender');
const ProcessorsExtenderPreprocessor = require('./processor/extender/preprocessor');
const ProcessorsExtenderSinglyPreprocessor = require('./processor/extender/preprocessor/singly');
const SourceMap = require('./sourcemap');
const registries = require('./registries');

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

	get BundlesConfig() {
		return BundlesConfig;
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

	createRegistries(config) {
		registries.create(config);
	}

	get bundles() {
		return registries.bundles;
	}

	get processors() {
		return registries.processors;
	}
})();
