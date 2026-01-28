import Link from "next/link";
import { notFound } from "next/navigation";
import { customerService } from "@/lib/services/customer-service";
import { updateCustomerAction } from "../../actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCustomerPage({ params }: Props) {
  const { id } = await params;
  const customer = await customerService.getById(+id);

  if (!customer) notFound();

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Edit customer #{customer.id}</h2>

      <form
        action={updateCustomerAction}
        className="flex flex-col gap-3 max-w-md"
      >
        <input type="hidden" name="id" value={customer.id} />

        <div className="flex flex-col gap-1">
          <label className="text-sm">First name</label>
          <input
            className="border px-2 py-1"
            name="firstName"
            defaultValue={customer.firstName}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Last name</label>
          <input
            className="border px-2 py-1"
            name="lastName"
            defaultValue={customer.lastName}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Email</label>
          <input
            className="border px-2 py-1"
            type="email"
            name="email"
            defaultValue={customer.email}
            required
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button type="submit" className="border px-4 py-1 bg-gray-100">
            Save
          </button>
          <Link
            href="/customers"
            className="border px-4 py-1 bg-gray-100 inline-block"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
