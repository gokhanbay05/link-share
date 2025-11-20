import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DragHandle = (props) => (
  <button {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-text-muted hover:text-primary cursor-grab active:cursor-grabbing transition"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 4H6m8 0h4M10 12H6m8 0h4M10 20H6m8 0h4"
      />
    </svg>
  </button>
);

const SortableLinkItem = ({ link, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link._id });

  const yOnlyTransform = transform ? { ...transform, x: 0 } : null;

  const style = {
    transform: CSS.Transform.toString(yOnlyTransform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
        flex flex-col p-4 rounded-xl shadow-md border border-border-soft
        md:flex-row md:items-center md:justify-between bg-card touch-none
      "
    >
      <div className="flex items-center gap-3 flex-1 mb-2 md:mb-0">
        <DragHandle {...listeners} {...attributes} />

        <div>
          <h3 className="font-semibold text-text">{link.title}</h3>

          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm text-primary transition
              hover:text-primary-hover cursor-pointer
              hover:shadow-[inset_0_-1px_0_var(--color-primary)]
            "
          >
            {link.url}
          </a>
        </div>
      </div>

      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => onEdit(link)}
          className="
            px-4 py-1.5 text-sm font-medium rounded-full
            bg-bg-soft text-text transition
            hover:bg-bg-muted hover:cursor-pointer
          "
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(link._id)}
          className="
            px-4 py-1.5 text-sm font-medium rounded-full
            bg-destructive text-text transition
            hover:bg-destructive-hover cursor-pointer
            hover:shadow-[inset_0_0_6px_var(--color-destructive)]
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SortableLinkItem;
