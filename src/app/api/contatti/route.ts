// Riceve i messaggi del modulo di contatto e li inoltra via email con Brevo,
// poi manda a chi ha scritto una mail di conferma.
// La chiave di Brevo resta sul server: il browser non la vede mai.

const OGGETTI = [
  "Informazioni generali",
  "Counseling transpersonale",
  "Yoga Anukalana e meditazione",
  "Mandala – Creatività consapevole",
] as const;

const EMAIL_VALIDA = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const URL_SITO = "https://mandalainteriore.it";

function escapeHtml(testo: string) {
  return testo
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inviaEmail(chiave: string, contenuto: object) {
  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": chiave,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(contenuto),
  });
}

// Mail di conferma per chi ha scritto. Il testo è fisso e non ripete il messaggio ricevuto:
// così il modulo non può essere usato per spedire testi a piacere a indirizzi altrui.
function emailConferma({
  nome,
  email,
  oggetto,
  mittente,
  destinatario,
}: {
  nome: string;
  email: string;
  oggetto: string;
  mittente: string;
  destinatario: string;
}) {
  // Solo il primo nome, e corto: è l'unico testo scelto da chi compila il modulo.
  const primoNome = nome.split(/\s+/)[0].slice(0, 30);
  const saluto = `Ciao ${primoNome},`;
  const paragrafi = [
    `grazie per avermi scritto. Ho ricevuto il tuo messaggio (${oggetto}) e ti risponderò il prima possibile.`,
  ];
  const avviso = "Questa è un’email automatica di conferma: ti chiedo di non rispondere a questo indirizzo.";
  const stileParagrafo = "font-size:17px;line-height:1.6;margin:0 0 16px";

  return {
    sender: { name: "Roxana Zlate · Mandala Interiore", email: mittente },
    to: [{ email, name: nome }],
    // La casella del mittente non viene letta: se qualcuno risponde comunque,
    // la risposta arriva a Roxana invece di andare persa.
    replyTo: { email: destinatario, name: "Roxana Zlate" },
    subject: "Ho ricevuto il tuo messaggio – Mandala Interiore",
    textContent: [
      saluto,
      ...paragrafi,
      "Un caro saluto,\nRoxana Zlate\nMandala Interiore – L’arte di ritornare a Sé",
      URL_SITO,
      `— ${avviso}`,
    ].join("\n\n"),
    htmlContent: `<div style="background:#eddcc8;padding:24px 8px;font-family:Georgia,'Times New Roman',serif;color:#1f1309">
  <div style="max-width:520px;margin:0 auto;background:#fffdfa;border:1px solid #d9c3a8;border-radius:8px;padding:28px 20px">
    <p style="margin:0 0 24px;text-align:center;font-size:17px;letter-spacing:1px;color:#553b20">MANDALA INTERIORE</p>
    <p style="${stileParagrafo}">${escapeHtml(saluto)}</p>
    ${paragrafi.map((p) => `<p style="${stileParagrafo}">${escapeHtml(p)}</p>`).join("\n    ")}
    <p style="font-size:17px;line-height:1.6;margin:24px 0 0">Un caro saluto,<br><strong>Roxana Zlate</strong></p>
    <p style="font-size:15px;font-style:italic;color:#553b20;margin:4px 0 0">L’arte di ritornare a Sé</p>
    <hr style="border:none;border-top:1px solid #e3d2bd;margin:28px 0 16px">
    <p style="font-size:13px;text-align:center;margin:0"><a href="${URL_SITO}" style="color:#553b20">mandalainteriore.it</a></p>
    <p style="font-size:12px;line-height:1.5;text-align:center;color:#7a6a5a;margin:12px 0 0">${escapeHtml(avviso)}</p>
  </div>
</div>`,
  };
}

export async function POST(request: Request) {
  let dati: Record<string, unknown>;
  try {
    dati = await request.json();
  } catch {
    return Response.json({ errore: "Richiesta non valida." }, { status: 400 });
  }

  const nome = String(dati.nome ?? "").trim();
  const email = String(dati.email ?? "").trim();
  const messaggio = String(dati.messaggio ?? "").trim();
  const oggetto = String(dati.oggetto ?? "");

  // Campo trappola: le persone non lo vedono, i bot lo compilano.
  // Rispondiamo "ok" senza inviare nulla, così il bot non capisce di essere stato scartato.
  if (String(dati.sito ?? "").trim() !== "") {
    return Response.json({ ok: true });
  }

  if (
    nome.length < 1 ||
    nome.length > 100 ||
    !EMAIL_VALIDA.test(email) ||
    email.length > 200 ||
    messaggio.length < 2 ||
    messaggio.length > 5000 ||
    !OGGETTI.includes(oggetto as (typeof OGGETTI)[number])
  ) {
    return Response.json({ errore: "Controlla i campi del modulo." }, { status: 400 });
  }

  const chiave = process.env.BREVO_API_KEY;
  const mittente = process.env.BREVO_MITTENTE_EMAIL;
  const destinatario = process.env.CONTATTI_DESTINATARIO;
  if (!chiave || !mittente || !destinatario) {
    console.error("Modulo contatti: mancano BREVO_API_KEY, BREVO_MITTENTE_EMAIL o CONTATTI_DESTINATARIO");
    return Response.json({ errore: "Invio non disponibile al momento." }, { status: 500 });
  }

  // 1. Il messaggio a Roxana
  const risposta = await inviaEmail(chiave, {
    sender: { name: "Sito Mandala Interiore", email: mittente },
    to: [{ email: destinatario, name: "Roxana Zlate" }],
    replyTo: { email, name: nome },
    subject: `Nuovo messaggio dal sito – ${oggetto}`,
    textContent: `Oggetto: ${oggetto}\nNome: ${nome}\nEmail: ${email}\n\n${messaggio}\n\n— Per rispondere, usa semplicemente "Rispondi".`,
    htmlContent: `<p><strong>Oggetto:</strong> ${escapeHtml(oggetto)}<br><strong>Nome:</strong> ${escapeHtml(nome)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(messaggio).replace(/\n/g, "<br>")}</p><p style="color:#777">Per rispondere, usa semplicemente "Rispondi".</p>`,
  });

  if (!risposta.ok) {
    console.error("Modulo contatti: Brevo ha risposto", risposta.status, await risposta.text());
    return Response.json({ errore: "Non è stato possibile inviare il messaggio." }, { status: 502 });
  }

  // 2. La conferma a chi ha scritto. Se non parte, il messaggio a Roxana è comunque arrivato:
  // lo segnaliamo solo nei log, senza mostrare un errore.
  const conferma = await inviaEmail(chiave, emailConferma({ nome, email, oggetto, mittente, destinatario }));
  if (!conferma.ok) {
    console.error("Modulo contatti: conferma non inviata", conferma.status, await conferma.text());
  }

  return Response.json({ ok: true });
}
