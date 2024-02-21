import './confirm.css'
export function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog">
      <div className='confirm_layout'>

        <p>{message}</p>
        <button onClick={onConfirm}>Xác nhận</button>
        <button onClick={onCancel}>Hủy</button>
      </div>
    </div>
  );
}