"use client";
export default function TabCloseButton({
  title = "Delete routine",
  onClick,
}: {
  title?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      className="absolute top-1 right-1 inline-flex h-6 w-6 items-center justify-center
                 rounded-full text-red-500 hover:bg-red-600 hover:text-white transition-colors"
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={title}
    >
      <span aria-hidden="true" className="text-lg leading-none font-bold">
        ×
      </span>
    </button>
  );
}
