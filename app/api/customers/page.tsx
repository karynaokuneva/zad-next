import Link from "next/link";
import { customerService } from "@/lib/services/customer-service";
import { createCustomerAction, deleteCustomerAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await customerService.getAll();

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Customers</h2>

      <form
        action={createCustomerAction}
        className="flex flex-wrap gap-2 items-end"
      >
        <div>
          <label className="block text-sm">First name</label>
          <input className="border px-2 py-1" name="firstName" required />
        </div>
        <div>
          <label className="block text-sm">Last name</label>
          <input className="border px-2 py-1" name="lastName" required />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input
            className="border px-2 py-1"
            type="email"
            name="email"
            required
          />
        </div>
        <button type="submit" className="border px-4 py-1 bg-gray-100">
          Submit
        </button>
      </form>

      <table className="table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-1">ID</th>
            <th className="border px-4 py-1">First name</th>
            <th className="border px-4 py-1">Last name</th>
            <th className="border px-4 py-1">Email</th>
            <th className="border px-4 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td className="border px-4 py-1">
                <Link href={`/customers/${c.id}/edit`} className="underline">
                  {c.id}
                </Link>
              </td>
              <td className="border px-4 py-1">{c.firstName}</td>
              <td className="border px-4 py-1">{c.lastName}</td>
              <td className="border px-4 py-1">{c.email}</td>
              <td className="border px-4 py-1">
                <form action={deleteCustomerAction}>
                  <input type="hidden" name="id" value={c.id} />
                  <button
                    type="submit"
                    className="border px-3 py-1 bg-gray-100"
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
