import { clsx } from "clsx";

type Status = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

const map: Record<Status, string> = {
  PENDING:    "bg-yellow-900/30 text-yellow-400 border-yellow-800/40",
  PROCESSING: "bg-blue-900/30 text-blue-400 border-blue-800/40",
  COMPLETED:  "bg-green-900/30 text-green-400 border-green-800/40",
  FAILED:     "bg-red-900/30 text-red-400 border-red-800/40",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={clsx("text-xs font-medium px-2 py-0.5 rounded-full border", map[status])}>
      {status}
    </span>
  );
}
