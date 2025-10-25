
// component for toast rendering with undo button
export const UndoToast = ({ closeToast, onUndo, variant }: { closeToast: () => void;  onUndo: () => void, variant: 'delete' | 'complete' }) => {
    return (
        <div className="flex items-center justify-between gap-2">
            <span>Task {variant == 'complete' ? 'completed' : 'deleted'}</span>
            <button
                className="ml-2  link"
                onClick={() => {
                    onUndo();
                    closeToast();
                }}
            >
                Undo
            </button>
        </div>
    );
};