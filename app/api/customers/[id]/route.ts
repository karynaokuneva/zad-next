import { NextResponse } from "next/server";
import { customerService } from "@/lib/services/customer-service";
import { CustomerInput } from "@/lib/models/customer";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function parseId(idParam: string): number | null {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const numId = parseId(id);
  if (numId === null) return jsonError("Invalid id", 400);

  const customer = await customerService.getById(numId);
  if (!customer) return jsonError("Customer not found", 404);

  return NextResponse.json(customer, { status: 200 });
}

export async function PUT(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const numId = parseId(id);
  if (numId === null) return jsonError("Invalid id", 400);

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

  const existing = await customerService.getById(numId);
  if (!existing) return jsonError("Customer not found", 404);

  const updated = await customerService.update(numId, {
    firstName,
    lastName,
    email,
  });
  return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const numId = parseId(id);
  if (numId === null) return jsonError("Invalid id", 400);

  const existing = await customerService.getById(numId);
  if (!existing) return jsonError("Customer not found", 404);

  await customerService.delete(numId);
  return new NextResponse(null, { status: 204 });
}
