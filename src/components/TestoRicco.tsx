import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { Testo } from "@/data/pagine";

const classeLink = "text-heading underline underline-offset-2 hover:opacity-70";

/**
 * Paragrafi scritti nel pannello. Ogni paragrafo riceve `classe`, così resta
 * figlio diretto del contenitore e ne rispetta la spaziatura (gap).
 */
export default function TestoRicco({
  valore,
  classe = "",
  classeElenco = "flex list-disc flex-col gap-2 pl-6",
}: {
  valore?: Testo;
  classe?: string;
  classeElenco?: string;
}) {
  if (!valore?.length) return null;

  const componenti: PortableTextComponents = {
    block: { normal: ({ children }) => <p className={classe}>{children}</p> },
    list: { bullet: ({ children }) => <ul className={`${classe} ${classeElenco}`}>{children}</ul> },
    listItem: { bullet: ({ children }) => <li>{children}</li> },
    marks: {
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      link: ({ value, children }) => {
        const href: string = value?.href ?? "#";
        if (href.startsWith("/")) {
          return (
            <Link href={href} className={classeLink}>
              {children}
            </Link>
          );
        }
        const esterno = href.startsWith("http");
        return (
          <a
            href={href}
            className={classeLink}
            {...(esterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {children}
          </a>
        );
      },
    },
  };

  return <PortableText value={valore} components={componenti} />;
}
