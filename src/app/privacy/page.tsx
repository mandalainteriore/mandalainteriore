import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import Divider from "@/components/Divider";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

function Sezione({
  titolo,
  children,
}: {
  titolo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-heading text-heading text-lg font-semibold tracking-tight">
        {titolo}
      </h2>
      {children}
    </section>
  );
}

export default function Privacy() {
  return (
    <>
      <main className="flex flex-col items-center gap-6 px-6 pt-32 md:pt-40 pb-10 text-center">
        <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="font-body italic text-lg">
          Ultimo aggiornamento: 6 ottobre 2026
        </p>
        <Divider className="text-heading h-4 w-40" />
      </main>

      <article className="font-body mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 pb-16 md:pb-24 text-lg leading-relaxed">
        <p>
          Questa informativa descrive come vengono trattati i dati personali
          di chi visita il sito Mandala Interiore e di chi mi contatta,
          ai sensi del Regolamento (UE) 2016/679 (&ldquo;GDPR&rdquo;) e del
          D.Lgs. 196/2003 (&ldquo;Codice Privacy&rdquo;).
        </p>

        <Sezione titolo="1. Titolare del trattamento">
          <p>
            Il titolare del trattamento è Roxana Zlate.
          </p>
          <p>
            Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a{" "}
            <a
              href="mailto:roxana.zlate11@gmail.com"
              className="text-heading underline underline-offset-2 hover:opacity-70"
            >
              roxana.zlate11@gmail.com
            </a>
            .
          </p>
        </Sezione>

        <Sezione titolo="2. Quali dati raccolgo">
          <p>
            <strong>Dati di navigazione.</strong> I sistemi che fanno
            funzionare il sito registrano, come avviene per qualsiasi sito web,
            alcuni dati tecnici: indirizzo IP, tipo di browser, data e ora
            della richiesta, pagine visitate. Servono solo a garantire il
            funzionamento e la sicurezza del sito e non vengono usati per
            identificarti.
          </p>
          <p>
            <strong>Dati che mi invii.</strong> Quando compili il modulo di
            contatto, mi scrivi un&rsquo;email o mi telefoni, tratto i dati
            che mi comunichi: nome, indirizzo email, eventuale numero di
            telefono e il contenuto del messaggio.
          </p>
          <p>
            <strong>Dati particolari.</strong> Ti chiedo di non inserire nel
            messaggio informazioni sulla tua salute o altri dati
            particolarmente delicati: potremo parlarne con calma durante un
            primo incontro. Se scegli comunque di condividerli, li tratterò
            esclusivamente per rispondere alla tua richiesta, sulla base del
            tuo consenso esplicito, che puoi revocare in qualsiasi momento.
          </p>
        </Sezione>

        <Sezione titolo="3. Perché tratto i dati e su quale base">
          <ul className="flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>Rispondere alle tue richieste</strong> di informazioni o
              di appuntamento: base giuridica è l&rsquo;esecuzione di misure
              precontrattuali richieste da te (art. 6.1.b GDPR).
            </li>
            <li>
              <strong>Gestire il sito e la sua sicurezza</strong>: base
              giuridica è il legittimo interesse del titolare (art. 6.1.f
              GDPR).
            </li>
            <li>
              <strong>Adempiere a obblighi di legge</strong>, ad esempio
              fiscali o contabili, se nasce un rapporto professionale (art.
              6.1.c GDPR).
            </li>
          </ul>
          <p>
            Non uso i tuoi dati per inviarti newsletter o comunicazioni
            promozionali, e non li vendo né li cedo a terzi.
          </p>
        </Sezione>

        <Sezione titolo="4. Per quanto tempo li conservo">
          <p>
            I dati dei messaggi vengono conservati per il tempo necessario a
            rispondere e, se non nasce un percorso insieme, al massimo per{" "}
            12 mesi. Se inizi un percorso, i
            dati sono conservati per la durata del rapporto e poi per il tempo
            previsto dagli obblighi di legge. I dati di navigazione sono
            conservati per un periodo limitato dal fornitore di hosting.
          </p>
        </Sezione>

        <Sezione titolo="5. Chi può accedere ai dati">
          <p>
            I dati sono trattati da me personalmente. Possono inoltre essere
            trattati, in qualità di responsabili del trattamento, i fornitori
            dei servizi tecnici che uso:
          </p>
          <ul className="flex list-disc flex-col gap-2 pl-6">
            <li>
              hosting del sito: Vercel Inc.;
            </li>
            <li>
              servizio email e invio dei messaggi del modulo di contatto:{" "}
              Google LLC (Gmail).
            </li>
          </ul>
          <p>
            Alcuni di questi fornitori potrebbero trattare dati al di fuori
            dell&rsquo;Unione Europea. In questi casi il trasferimento avviene
            sulla base di una decisione di adeguatezza della Commissione
            Europea (ad esempio l&rsquo;EU-US Data Privacy Framework) o delle
            clausole contrattuali standard.
          </p>
        </Sezione>

        <Sezione titolo="6. Cookie">
          <p>
            Questo sito non usa cookie di profilazione né strumenti di
            statistica o pubblicità. I caratteri tipografici sono ospitati
            direttamente sul sito, senza collegamenti a servizi esterni.
            Eventuali cookie tecnici, necessari al funzionamento, non
            richiedono il tuo consenso.
          </p>
        </Sezione>

        <Sezione titolo="7. Link ai social network">
          <p>
            Il sito contiene semplici link ai profili Instagram e Facebook.
            Non sono pulsanti integrati: nessun dato viene inviato a questi
            servizi finché non clicchi il link. Una volta sulle loro pagine,
            vale l&rsquo;informativa privacy di Meta Platforms.
          </p>
        </Sezione>

        <Sezione titolo="8. I tuoi diritti">
          <p>In qualsiasi momento puoi chiedermi di:</p>
          <ul className="flex list-disc flex-col gap-2 pl-6">
            <li>accedere ai tuoi dati e riceverne una copia;</li>
            <li>correggerli o aggiornarli;</li>
            <li>cancellarli;</li>
            <li>limitarne il trattamento od opporti a esso;</li>
            <li>riceverli in un formato leggibile (portabilità);</li>
            <li>revocare il consenso eventualmente dato.</li>
          </ul>
          <p>
            Basta scrivere a{" "}
            <a
              href="mailto:roxana.zlate11@gmail.com"
              className="text-heading underline underline-offset-2 hover:opacity-70"
            >
              roxana.zlate11@gmail.com
            </a>
            . Se ritieni che il trattamento non sia corretto, puoi presentare
            reclamo al Garante per la protezione dei dati personali (
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-heading underline underline-offset-2 hover:opacity-70"
            >
              www.garanteprivacy.it
            </a>
            ).
          </p>
        </Sezione>

        <Sezione titolo="9. Modifiche a questa informativa">
          <p>
            Questa informativa può essere aggiornata nel tempo. La data
            dell&rsquo;ultima modifica è indicata in cima alla pagina.
          </p>
        </Sezione>
      </article>

      <SiteFooter />
    </>
  );
}
