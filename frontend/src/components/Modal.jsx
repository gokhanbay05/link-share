const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="
          relative w-full max-w-lg mx-4 p-6
          rounded-xl bg-card shadow-xl border border-border-soft
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-border-soft">
          <h3 className="text-xl font-semibold text-text tracking-wide">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="
              text-2xl text-text-muted leading-none
              hover:text-primary-hover transition cursor-pointer
            "
          >
            &times;
          </button>
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
