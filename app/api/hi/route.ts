export async function GET() {
  return new Response("Hoola from next.js route handler!", {
    status: 200,
  });
}

export async function POST() {
  return new Response("I'm posting something to this handler", {
    status: 200,
  });
}
