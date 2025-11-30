import { useRef, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const HIGHLIGHT_ATTR = "data-search-highlight";

function clearHighlights(root: HTMLElement | Document = document) {
  const marks = root.querySelectorAll(`mark[${HIGHLIGHT_ATTR}]`);
  marks.forEach((m) => {
    const parent = m.parentNode as Node | null;
    if (!parent) return;
    while (m.firstChild) parent.insertBefore(m.firstChild, m);
    parent.removeChild(m);
    if ((parent as HTMLElement)?.normalize) (parent as HTMLElement).normalize();
  });
}

function highlightIn(root: HTMLElement, query: string) {
  clearHighlights(root);
  if (!query.trim()) return 0;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.textContent ?? "";
      if (!text.trim()) return NodeFilter.FILTER_REJECT;
      if ((node.parentElement && ["SCRIPT", "STYLE"].includes(node.parentElement.tagName))) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const q = query.toLowerCase();
  let count = 0;
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  nodes.forEach((textNode) => {
    let text = textNode.nodeValue ?? "";
    let idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return;

    const frag = document.createDocumentFragment();
    while (idx !== -1) {
      const before = text.slice(0, idx);
      if (before) frag.append(before as unknown as Node);
      const mark = document.createElement("mark");
      mark.setAttribute(HIGHLIGHT_ATTR, "");
      mark.textContent = text.slice(idx, idx + q.length);
      frag.append(mark);
      count++;
      text = text.slice(idx + q.length);
      idx = text.toLowerCase().indexOf(q);
    }
    if (text) frag.append(text as unknown as Node);
    textNode.replaceWith(frag);
  });
  return count;
}

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputRef.current?.value ?? "";
    const main = document.querySelector("main");
    if (!main) return;
    const matches = highlightIn(main as HTMLElement, query);
    if (matches > 0) {
      const first = main.querySelector(`mark[${HIGHLIGHT_ATTR}]`);
      (first as HTMLElement | null)?.scrollIntoView({ behavior: "smooth", block: "center" });
      setOpen(false);
      toast({ title: lang === "de" ? "Suche" : "Search", description: `${matches} ${lang === "de" ? "Treffer" : "matches"}` });
    } else {
      toast({ title: lang === "de" ? "Keine Treffer" : "No matches", description: lang === "de" ? "Bitte einen anderen Begriff versuchen." : "Try another term." });
    }
  };

  const navItems = [
    { href: "/#/", labelDe: "Home", labelEn: "Home" },
    { href: "/#/uber-uns", labelDe: "Über uns", labelEn: "About Us" },
    { href: "/#/dienstleistungen", labelDe: "Dienstleistungen", labelEn: "Services" },
    { href: "/#/formulare", labelDe: "Formulare", labelEn: "Forms" },
    { href: "/#/kontakt", labelDe: "Kontakt", labelEn: "Contact" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="/#/" className="flex items-center gap-3">
          <img
            src="./numerix_logo.png"
            alt="Numerix GmbH"
            className="h-36 w-auto"
            loading="eager"
          />
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
            >
              {lang === "de" ? item.labelDe : item.labelEn}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Dialog open={open} onOpenChange={(o)=>{ if(!o) clearHighlights(); setOpen(o); }}>
            <DialogTrigger asChild>
              <Button variant="ghost" aria-label="Search">
                <Search />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <form className="space-y-2" onSubmit={onSearch}>
                <p className="text-sm text-muted-foreground">
                  {lang === "de" ? "Suche" : "Search"}
                </p>
                <div className="flex gap-2">
                  <Input ref={inputRef} autoFocus placeholder={lang === "de" ? "Begriff eingeben..." : "Type to search..."} />
                  <Button type="submit">{lang === "de" ? "Suchen" : "Search"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <div className="mx-1 inline-flex overflow-hidden rounded-md border">
            <button
              className={`px-3 py-1 text-sm ${lang === "de" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              onClick={() => setLang("de")}
              aria-pressed={lang === "de"}
            >
              DE
            </button>
            <button
              className={`px-3 py-1 text-sm ${lang === "en" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" aria-label="Menu" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
                  >
                    {lang === "de" ? item.labelDe : item.labelEn}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
