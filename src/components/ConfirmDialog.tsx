const ConfirmDialog = ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white p-4 rounded">
      <p>Are you sure you want to delete?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  </div>
);

export default ConfirmDialog;
