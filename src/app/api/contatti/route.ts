// Riceve i messaggi del modulo di contatto e li inoltra via email con Brevo.
// La chiave di Brevo resta sul server: il browser non la vede mai.

const OGGETTI = [
  "Informazioni generali",
  "Counseling transpersonale",
  "Yoga Anukalana e meditazione",
  "Mandala – Creatività consapevole",
] as const;

const EMAIL_VALIDA = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(testo: string) {
  return testo
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

  const risposta = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": chiave,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Sito Mandala Interiore", email: mittente },
      to: [{ email: destinatario, name: "Roxana Zlate" }],
      replyTo: { email, name: nome },
      subject: `Nuovo messaggio dal sito – ${oggetto}`,
      textContent: `Oggetto: ${oggetto}\nNome: ${nome}\nEmail: ${email}\n\n${messaggio}\n\n— Per rispondere, usa semplicemente "Rispondi".`,
      htmlContent: `<p><strong>Oggetto:</strong> ${escapeHtml(oggetto)}<br><strong>Nome:</strong> ${escapeHtml(nome)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(messaggio).replace(/\n/g, "<br>")}</p><p style="color:#777">Per rispondere, usa semplicemente "Rispondi".</p>`,
    }),
  });

  if (!risposta.ok) {
    console.error("Modulo contatti: Brevo ha risposto", risposta.status, await risposta.text());
    return Response.json({ errore: "Non è stato possibile inviare il messaggio." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
