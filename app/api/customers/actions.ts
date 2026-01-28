"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { customerService } from "@/lib/services/customer-service";
import type { CustomerInput } from "@/lib/models/customer";

export async function createCustomerAction(formData: FormData) {
  const input: CustomerInput = {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
  };

  if (!input.firstName || !input.lastName || !input.email) {
    throw new Error("firstName, lastName, email are required");
  }

  await customerService.create(input);
  revalidatePath("/customers");
}

export async function deleteCustomerAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid id");

  await customerService.delete(id);
  revalidatePath("/customers");
}

export async function updateCustomerAction(formData: FormData) {
  const id = Number(formData.get("id"));

  const input: CustomerInput = {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
  };

  if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid id");
  if (!input.firstName || !input.lastName || !input.email) {
    throw new Error("firstName, lastName, email are required");
  }

  await customerService.update(id, input);
  redirect("/customers");
}
