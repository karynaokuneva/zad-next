import { NextResponse } from "next/server";
import { customerService } from "@/lib/services/customer-service";
import { CustomerInput } from "@/lib/models/customer";

export const dynamic = "force-dynamic";

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET() {
  const customers = await customerService.getAll();
  return NextResponse.json(customers, { status: 200 });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const { firstName, lastName, email } = body as Partial<CustomerInput>;
  if (!firstName || !lastName || !email) {
    return jsonError("firstName, lastName and email are required", 400);
  }

  const created = await customerService.create({ firstName, lastName, email });
  const location = `/api/customers/${created.id}`;

  return NextResponse.json(created, {
    status: 201,
    headers: { Location: location },
  });
}
