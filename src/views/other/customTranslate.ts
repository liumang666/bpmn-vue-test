import translations from "./translationsGerman.ts"

export default function customTranslate(template: string, replacements: any) {
  replacements = replacements || {}

  // Translate
  template = (translations as any)[template] || template

  // Replace
  return template.replace(/{([^}]+)}/g, function (_, key) {
    return replacements[key] || "{" + key + "}"
  })
}
