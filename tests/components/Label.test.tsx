import { render, screen } from "@testing-library/react";
import Label from "../../src/components/Label";
import { LanguageProvider } from "../../src/providers/language/LanguageProvider";
import { Language } from "../../src/providers/language/type";
import en from "../../src/providers/language/data/en.json";
import es from "../../src/providers/language/data/es.json";

describe("testing Label component", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const languageMap: { [lang: string]: any } = { en, es };
  const renderComponent = ({ lang, labelId }: { lang: Language; labelId: string }) => {
    render(
      <LanguageProvider language={lang}>
        <Label labelId={labelId} />
      </LanguageProvider>
    );
  };
  type TestData = { lang: Language };
  const testDataList: TestData[] = [{ lang: "en" }, { lang: "es" }];
  it.each(testDataList)("should render correct label for current language $lang", ({ lang }) => {
    const labelId = "welcome";
    renderComponent({ lang, labelId });
    const text = screen.getByText(languageMap[lang][labelId]);
    expect(text).toBeInTheDocument();
    expect(text.textContent).toEqual(languageMap[lang][labelId]);
  });
  it("should throw error when lableId is invalid", () => {
    expect(() => renderComponent({ labelId: "1234", lang: "en" })).toThrowError();
  });
});
