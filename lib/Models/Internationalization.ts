import i18next, { ReactOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi, { RequestCallback } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import isDefined from "../Core/isDefined";

export interface I18nBackendOptions {
  crossDomain?: boolean;
  loadPath?: string;
  parse?: (
    data: any,
    languages: string | [string],
    namespaces: string
  ) => { [key: string]: any };
  request?: (
    options: any,
    url: string,
    payload: any,
    callback: RequestCallback
  ) => void;
}

export interface I18nStartOptions {
  backend?: I18nBackendOptions;
  skipInit?: boolean; // skip initialising i18next. Used in CI
}

export interface LanguageConfiguration {
  enabled: boolean;
  debug: boolean;
  react: ReactOptions;
  languages: object;
  fallbackLanguage: string;
  changeLanguageOnStartWhen: string[];

  overridesBaseUrl?: string;
}
const defaultLanguageConfiguration = {
  enabled: false,
  debug: false,
  react: {
    useSuspense: false
  },
  languages: {
    en: "english"
  },
  fallbackLanguage: "en",
  changeLanguageOnStartWhen: [
    "querystring",
    "localStorage",
    "navigator",
    "htmlTag"
  ]
};

class Internationalization {
  static initLanguage(
    languageConfiguration: LanguageConfiguration | undefined,
    i18StartOptions: I18nStartOptions | undefined,
    terriajsResourcesBaseUrl: string
  ) {
    const languageConfig = Object.assign(
      defaultLanguageConfiguration,
      languageConfiguration
    );

    return i18next
      .use(HttpApi)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        compatibilityJSON: "v3",
        debug: languageConfig.debug,
        react: languageConfig.react,
        fallbackLng: languageConfig.fallbackLanguage,
        supportedLngs: Object.keys(languageConfig.languages),
        nonExplicitSupportedLngs: true,
        load: "languageOnly",
        saveMissing: false,
        partialBundledLanguages: true,

        ns: ["translation", "languageOverrides"],
        defaultNS: "languageOverrides",
        fallbackNS: "translation",

        backend: Object.assign(
          {
            loadPath: function loadPath(
              [_lng]: string[],
              [namespace]: string[]
            ) {
              if (namespace === "translation")
                return `${terriajsResourcesBaseUrl}languages/{{lng}}/{{ns}}.json`;

              if (
                namespace === "languageOverrides" &&
                isDefined(languageConfig.overridesBaseUrl)
              ) {
                return `${languageConfig.overridesBaseUrl}{{lng}}.json`;
              }

              if (namespace === "languageOverrides") {
                return `/static/webgis/wwwroot/languages/{{lng}}/{{ns}}.json`;
              }

              return `languages/{{lng}}/{{ns}}.json`;
            },
            crossDomain: false
          },
          { ...i18StartOptions?.backend }
        ),

        detection: {
          order: languageConfig.changeLanguageOnStartWhen,
          lookupQuerystring: "lng",
          lookupCookie: "i18next",
          lookupLocalStorage: "i18nextLng",
          caches: ["localStorage"],
          excludeCacheFor: ["cimode"]
        },
        interpolation: {
          escapeValue: false
        }
      });
  }
}

export default Internationalization;
