import { redirect } from "next/navigation";

export default function AdminIndex() {
  redirect("/x-admin/login");
}
