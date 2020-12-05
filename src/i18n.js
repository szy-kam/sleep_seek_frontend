import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        lng: "pl",
        backend: {
            /* translation file path */
            // loadPath: "/{{ns}}/{{lng}}.json",
            loadPath: "/translations/pl.json",
        },
        fallbackLng: "pl",
        debug: false,
        /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
        ns: ["translations"],
        defaultNS: "translations",
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ",",
        },
        react: {
            wait: true,
        },
        initImmediate : false
    });

export default i18n;
