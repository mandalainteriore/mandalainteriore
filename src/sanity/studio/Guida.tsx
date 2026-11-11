"use client";

// Pagina di benvenuto del pannello: scorciatoie e istruzioni per Roxana.
import type { ReactNode } from "react";
import { Badge, Box, Button, Card, Container, Flex, Grid, Heading, Stack, Text } from "@sanity/ui";
import { AddIcon } from "@sanity/icons/Add";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { EditIcon } from "@sanity/icons/Edit";
import { HomeIcon } from "@sanity/icons/Home";
import { ImageIcon } from "@sanity/icons/Image";
import { PublishIcon } from "@sanity/icons/Publish";
import { ResetIcon } from "@sanity/icons/Reset";
import { TrashIcon } from "@sanity/icons/Trash";
import { IntentLink } from "sanity/router";
import { Logo } from "./aspetto";

const PAGINE: [id: string, tipo: string, titolo: string][] = [
  ["homepage", "homepage", "Homepage"],
  ["laMiaStoria", "laMiaStoria", "La mia storia"],
  ["percorsi", "percorsi", "Percorsi"],
  ["chiave-counseling", "chiave", "Counseling transpersonale"],
  ["chiave-yoga", "chiave", "Yoga e meditazione"],
  ["chiave-mandala", "chiave", "Mandala – Creatività consapevole"],
  ["paginaMandala", "paginaMandala", "Pagina Mandala"],
  ["contatti", "contatti", "Contatti"],
  ["impostazioni", "impostazioni", "Instagram e Facebook"],
  ["privacy", "privacy", "Privacy Policy"],
];

function Passo({ numero, titolo, children }: { numero: number; titolo: string; children: ReactNode }) {
  return (
    <Card padding={4} radius={3} tone="primary" border>
      <Stack gap={3}>
        <Flex align="center" gap={2}>
          <Badge tone="primary" fontSize={2} padding={2} radius={6}>
            {numero}
          </Badge>
          <Text size={2} weight="semibold">
            {titolo}
          </Text>
        </Flex>
        <Text size={2} muted>
          {children}
        </Text>
      </Stack>
    </Card>
  );
}

function Istruzione({
  icona,
  titolo,
  passi,
  nota,
}: {
  icona: ReactNode;
  titolo: string;
  passi: ReactNode[];
  nota?: ReactNode;
}) {
  return (
    <Card padding={4} radius={3} border>
      <Stack gap={4}>
        <Flex align="center" gap={3}>
          <Text size={3}>{icona}</Text>
          <Heading as="h3" size={1}>
            {titolo}
          </Heading>
        </Flex>
        <Stack as="ol" gap={3} style={{ margin: 0, paddingLeft: "1.25rem" }}>
          {passi.map((passo, i) => (
            <Text as="li" key={i} size={2}>
              {passo}
            </Text>
          ))}
        </Stack>
        {nota && (
          <Card padding={3} radius={2} tone="caution">
            <Text size={1}>{nota}</Text>
          </Card>
        )}
      </Stack>
    </Card>
  );
}

const B = ({ children }: { children: ReactNode }) => <strong>{children}</strong>;

export function Guida() {
  return (
    <Box padding={[3, 4, 5]} style={{ overflowY: "auto", height: "100%" }}>
      <Container width={3}>
        <Stack gap={6}>
          {/* Benvenuto */}
          <Flex align="center" gap={4}>
            <Box style={{ fontSize: 40 }}>
              <Logo />
            </Box>
            <Stack gap={3}>
              <Heading as="h1" size={4}>
                Ciao Roxana, benvenuta!
              </Heading>
              <Text size={2} muted>
                Da qui modifichi tutti i testi e le foto del sito Mandala Interiore. Non puoi
                rompere niente: finché non premi “Pubblica”, il sito resta com’è.
              </Text>
            </Stack>
          </Flex>

          {/* Come funziona */}
          <Stack gap={4}>
            <Heading as="h2" size={2}>
              Come funziona, in tre passi
            </Heading>
            <Grid gridTemplateColumns={[1, 1, 3]} gap={3}>
              <Passo numero={1} titolo="Scegli cosa modificare">
                Usa i pulsanti qui sotto, oppure apri <B>Contenuti</B> in alto e scegli una
                pagina. In cima al modulo ci sono le <B>schede</B> con le parti della pagina
                (Apertura, Eventi, …): cliccale per passare da una all’altra.
              </Passo>
              <Passo numero={2} titolo="Modifica">
                Scrivi direttamente nei campi. Tutto viene salvato da solo come{" "}
                <B>bozza</B>: lo vedi solo tu, il sito non cambia ancora.
              </Passo>
              <Passo numero={3} titolo="Premi “Pubblica”">
                Il pulsante verde in basso a destra. Dopo pochi secondi la modifica è
                online: ricarica la pagina del sito per vederla.
              </Passo>
            </Grid>
          </Stack>

          {/* Scorciatoie */}
          <Stack gap={4}>
            <Heading as="h2" size={2}>
              Vai subito a…
            </Heading>
            <Grid gridTemplateColumns={[1, 2, 2]} gap={3}>
              <Button
                as={IntentLink}
                intent="create"
                params={{ type: "evento" }}
                icon={AddIcon}
                text="Aggiungi un evento"
                tone="primary"
                padding={4}
                fontSize={2}
              />
              <Button
                as={IntentLink}
                intent="create"
                params={{ type: "mandala" }}
                icon={AddIcon}
                text="Aggiungi un mandala"
                tone="primary"
                padding={4}
                fontSize={2}
              />
            </Grid>
            <Grid gridTemplateColumns={[1, 2, 3]} gap={2}>
              {PAGINE.map(([id, tipo, titolo]) => (
                <Button
                  key={id}
                  as={IntentLink}
                  intent="edit"
                  params={{ id, type: tipo }}
                  icon={id === "homepage" ? HomeIcon : DocumentTextIcon}
                  text={titolo}
                  mode="ghost"
                  padding={3}
                  justify="flex-start"
                />
              ))}
            </Grid>
          </Stack>

          {/* Istruzioni */}
          <Stack gap={4}>
            <Heading as="h2" size={2}>
              Come fare per…
            </Heading>
            <Grid gridTemplateColumns={[1, 1, 2]} gap={3}>
              <Istruzione
                icona={<EditIcon />}
                titolo="Cambiare un testo"
                passi={[
                  <>Clicca nel testo e scrivi. Con <B>Invio</B> inizi un nuovo paragrafo.</>,
                  <>Seleziona delle parole per metterle in <B>grassetto</B>, in <em>corsivo</em> o per farne un link, con i pulsanti sopra il campo.</>,
                  <>Le frasi in corsivo sotto i titoli hanno un campo tutto loro: lì il corsivo è già automatico.</>,
                ]}
              />
              <Istruzione
                icona={<ImageIcon />}
                titolo="Cambiare una foto"
                passi={[
                  <>Trascina la nuova foto sopra quella vecchia, oppure apri il menu della foto (i tre puntini) e scegli <B>Sostituisci</B>.</>,
                  <>Con il pulsante <B>Ritaglia immagine</B> sulla foto trascina il cerchio sul punto più importante: il sito lo terrà sempre visibile quando la foto viene ritagliata.</>,
                  <>Compila la <B>Descrizione della foto</B>: una frase su cosa mostra. Serve a chi non vede e a Google.</>,
                ]}
                nota="Usa foto di almeno 1500 pixel di lato e non oltre 5 MB. Le immagini di apertura vanno orizzontali, quelle per telefono verticali."
              />
              <Istruzione
                icona={<CalendarIcon />}
                titolo="Aggiungere un evento"
                passi={[
                  <>Premi <B>Aggiungi un evento</B> qui sopra (oppure Contenuti → Eventi → <B>Crea</B>).</>,
                  <>Scrivi il titolo, poi premi <B>Genera</B> accanto a “Indirizzo della pagina”.</>,
                  <>Compila data, luogo, locandina (verticale 2:3), breve descrizione e testo: un riquadro per paragrafo.</>,
                  <>Premi <B>Pubblica</B>. Gli eventi si ordinano da soli per data; dopo i primi sei, i più vecchi finiscono in “eventi passati”.</>,
                ]}
              />
              <Istruzione
                icona={<ImageIcon />}
                titolo="Aggiungere o riordinare i mandala"
                passi={[
                  <>Premi <B>Aggiungi un mandala</B>: titolo, foto ed eventuale descrizione, poi <B>Pubblica</B>.</>,
                  <>Per cambiare l’ordine della galleria apri Contenuti → <B>Mandala – galleria</B> e trascina i mandala tenendo premuta la maniglia a sinistra.</>,
                  <>Nella galleria la foto si vede quadrata; aperta, si vede intera.</>,
                ]}
              />
              <Istruzione
                icona={<TrashIcon />}
                titolo="Togliere un evento o un mandala"
                passi={[
                  <>Apri l’evento o il mandala e clicca la freccina accanto a <B>Pubblica</B>, in basso a destra.</>,
                  <><B>Rimuovi pubblicazione</B>: sparisce dal sito ma resta qui come bozza, e puoi ripubblicarlo quando vuoi.</>,
                  <><B>Elimina</B>: lo cancella del tutto.</>,
                ]}
                nota="Nel dubbio usa “Rimuovi pubblicazione”: si torna indietro con un clic."
              />
              <Istruzione
                icona={<ResetIcon />}
                titolo="Tornare indietro"
                passi={[
                  <>Se non hai ancora pubblicato: freccina accanto a <B>Pubblica</B> → <B>Annulla modifiche</B>. Torna tutto come sul sito.</>,
                  <>Se hai già pubblicato: clicca <B>Rivedi le modifiche</B> (in basso, accanto a “Salvato”), apri la scheda <B>Cronologia</B>, scegli una versione precedente e premi <B>Ripristina</B>, poi <B>Pubblica</B>.</>,
                ]}
              />
            </Grid>
          </Stack>

          {/* Cosa non si cambia da qui */}
          <Card padding={4} radius={3} tone="transparent" border>
            <Stack gap={3}>
              <Flex align="center" gap={3}>
                <Text size={3}>
                  <PublishIcon />
                </Text>
                <Heading as="h3" size={1}>
                  Cosa non si cambia da qui
                </Heading>
              </Flex>
              <Text size={2} muted>
                Il menu, i pulsanti di navigazione, il logo, i colori, le icone delle chiavi e la
                disposizione delle pagine fanno parte della struttura del sito.
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
