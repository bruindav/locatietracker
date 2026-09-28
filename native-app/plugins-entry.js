// Fix: entrypunt voor esbuild dat de Capacitor-pluginwrappers bundelt tot één
// browser-klaar bestand (www/js/capacitor-plugins.js), zodat index.html ze
// zonder bundler-syntax (import/export) kan gebruiken via window.CapPlugins
// (branch fix-21 — achtergrondlocatie).
// Dit pluginpakket levert alleen native Android/iOS-code, geen kant-en-klare
// JS-wrapper — dus registreren we de proxy hier zelf met registerPlugin,
// precies zoals de plugin dat intern ook zou doen.
import { registerPlugin } from '@capacitor/core';

const BackgroundGeolocation = registerPlugin('BackgroundGeolocation');

window.CapPlugins = window.CapPlugins || {};
window.CapPlugins.BackgroundGeolocation = BackgroundGeolocation;
